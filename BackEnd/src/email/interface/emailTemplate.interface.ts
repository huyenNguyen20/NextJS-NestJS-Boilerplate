import { Document } from 'mongoose';

export interface EmailTemplate extends Document {
  readonly name: string;
  readonly subject: string;
  readonly message: string;
}
