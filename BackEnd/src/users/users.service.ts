import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../shared/interfaces/user.interface';
import { PassportLocalModel } from 'mongoose';
import { CreateUserLocalDto } from '../shared/dto/createUserLocal.dto';
import { CreateUserOAuthDto } from '../shared/dto/createUserOAuth.dto';
import { respMessage } from '../shared/interfaces/respMessage.interface';
import { UserService } from './interfaces/userService.interface';
import * as lodash from 'lodash';

@Injectable()
export class UsersService implements UserService {
  constructor(
    @InjectModel('User') private userModel: PassportLocalModel<User>,
  ) {}

  publicFields(): string[] {
    return [
      'id',
      'displayName',
      'email',
      'firstName',
      'lastName',
      'avatarUrl',
      'isAdmin',
      'createdAt',
      'emailActivated',
    ];
  }

  async signUpWithLocalStrategy({
    username,
    email,
    password,
    firstName = '',
    lastName = '',
  }: CreateUserLocalDto): Promise<respMessage> {
    let result: respMessage = {
      success: true,
      response: {
        message: 'Registration Successful',
      },
    };
    const registeredEmail = await this.userModel.findOne({ email });
    const registeredUsername = await this.userModel.findOne({ username });

    if (!email)
      result = { success: false, response: { message: 'Email is Required' } };
    else if (!username)
      result = {
        success: false,
        response: { message: 'Username is Required' },
      };
    else if (!password)
      result = {
        success: false,
        response: { message: 'Password is Required' },
      };
    else if (!email.match(/.+@.+\..+/))
      result = {
        success: false,
        response: {
          message: 'Invalid Email. Email should be like abc@example.com',
        },
      };
    else if (password.trim().length < 8)
      result = {
        success: false,
        response: {
          message:
            'Invalid Password. Password need to be at least 8 characters.',
        },
      };
    else if (registeredEmail)
      result = {
        success: false,
        response: {
          message:
            'Email already exists. Please sign up with different email or login.',
        },
      };
    else if (registeredUsername)
      result = {
        success: false,
        response: {
          message:
            'Username already exists. Please sign up with different username or login.',
        },
      };
    else {
      await this.userModel.register(
        new this.userModel({
          username,
          firstName,
          lastName,
          displayName: username,
          email,
        }),
        password.trim(),
        (err) => {
          if (err)
            result = { success: false, response: { message: err.toString() } };
        },
      );
    }
    return result;
  }

  async signUpOrSignInWithOAuth({
    OAuthId,
    email,
    displayName,
    avatarUrl,
  }: CreateUserOAuthDto): Promise<User | null> {
    let user: User;
    const registeredEmail = await this.userModel.findOne({ email });
    const registeredUser = await this.userModel.findOne({ OAuthId });
    if (registeredEmail) user = registeredEmail;
    else if (!registeredUser) {
      const newUser = await this.userModel.create({
        OAuthId,
        email,
        displayName,
        avatarUrl,
        username: OAuthId,
      });
      user = newUser;
    } else {
      user = registeredUser;
    }
    return user;
  }

  async activateUserEmail(userId: string): Promise<respMessage> {
    // 1. Use findById to find an user
    // 2. If not, throw an error
    // 3. If yes, use updateOne to update the emailActivated to true
    // 4. Then, send an welcome email, return success
    try {
      const user = await this.userModel.findById(userId);
      if (!user) throw Error("The user doesn't exist");
      await this.userModel
        .updateOne(
          { _id: userId },
          { $set: { emailActivated: true }, new: true },
        )
        .exec();
      return {
        success: true,
        response: {
          user: { displayName: user.displayName, email: user.email },
        },
      };
    } catch (err) {
      return {
        success: false,
        response: { message: err.message || err.toString() },
      };
    }
  }

  async resetPassword(password: string, email: string): Promise<respMessage> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      try {
        await user.setPassword(password);
        await user.save();
        return {
          success: true,
          response: { message: 'Password Reset Successfully' },
        };
      } catch (err) {
        return {
          success: false,
          response: { message: err.message || err.toString() },
        };
      }
    }
    return { success: false, response: { message: 'No user with this email' } };
  }

  async getUsers(): Promise<respMessage> {
    try {
      const users = await this.userModel.find({}).exec();
      return { success: true, response: { users } };
    } catch (err) {
      return {
        success: false,
        response: { message: err.message || err.toString() },
      };
    }
  }

  async getProfile(userId: string): Promise<any> {
    const user = await this.userModel.findById(userId).exec();
    if (!user)
      return { success: false, response: { message: 'User Not Found' } };
    return {
      success: true,
      response: { user: lodash.pick(user, this.publicFields()) },
    };
  }

  async getUser(userId: string): Promise<User | null> {
    return await this.userModel.findById(userId).exec();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async modifyUser(userId: string, updatedFields: any): Promise<respMessage> {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        userId,
        { $set: { ...updatedFields } },
        { new: true },
      );
      if (!user) throw new Error('User Not Found');
      return {
        success: true,
        response: { message: 'Update User Profile Successfully' },
      };
    } catch (err) {
      return {
        success: false,
        response: { message: err.message || err.toString() },
      };
    }
  }

  async deleteUser(userId: string): Promise<respMessage> {
    try {
      const user = await this.userModel.findByIdAndRemove(userId).exec();
      if (!user) throw new Error('User Not Found');
      return {
        success: true,
        response: { message: 'Delete User Account Successfully' },
      };
    } catch (err) {
      return {
        success: false,
        response: { message: err.message || err.toString() },
      };
    }
  }

  async deleteUsers(): Promise<respMessage> {
    try {
      const user = await this.userModel.remove({ admin: false }).exec();
      if (!user) throw new Error('Something went wrong');
      return {
        success: true,
        response: { message: 'Delete Users Successfully' },
      };
    } catch (err) {
      return {
        success: false,
        response: { message: err.message || err.toString() },
      };
    }
  }
}
