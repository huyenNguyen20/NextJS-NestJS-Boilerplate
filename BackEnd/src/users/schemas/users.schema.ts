import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

export type UserDocument = User & Document;
export class Users {
  Users: User[];
}

@Schema()
export class User {
  OAuthId: string;

  @Prop({
    trim: true,
    unique: 'Email already exists',
    match: [/.+@.+\..+/, 'Please enter valid email address'],
  })
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: '' })
  firstName: string;

  @Prop({ default: '' })
  lastName: string;

  @Prop({ default: '' })
  displayName: string;

  @Prop({ default: '' })
  avatarUrl: string;

  @Prop({ default: false })
  emailActivated: boolean;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(passportLocalMongoose);

export { UserSchema };
