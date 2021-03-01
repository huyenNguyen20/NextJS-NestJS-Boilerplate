import { PassportLocalDocument } from 'mongoose';

export interface User extends PassportLocalDocument {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt: Date;
  readonly displayName: string;
  readonly avatarUrl: string;
  readonly emailActivated: boolean;
  readonly isAdmin: boolean;
  readonly OAuthId: string;
  readonly username: string;
}
