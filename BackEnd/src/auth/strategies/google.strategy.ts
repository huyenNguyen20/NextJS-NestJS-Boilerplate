import { Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';

require('dotenv').config();
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done,
  ): Promise<void> {
    try {
      const resp = await this.usersService.signUpOrSignInWithOAuth({
        OAuthId: profile.id,
        email: profile.emails[0].value,
        displayName: profile.displayName,
        avatarUrl:
          profile.photos && profile.photos.length > 0
            ? profile.photos[0].value.replace('sz=50', 'sz=128')
            : '',
      });
      if (resp) {
        done(null, resp);
      } else throw new Error('Something went wrong. Please try later!');
    } catch (err) {
      done(err, null);
    }
  }
}
