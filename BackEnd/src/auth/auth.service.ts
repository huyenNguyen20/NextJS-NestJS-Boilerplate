import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { id: user.id };
    return {
      success: true,
      token: this.jwtService.sign(payload),
      response: {
        message: 'Login Successfully',
      },
    };
  }
}
