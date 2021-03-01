import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailDocument = EmailTemplate & Document;

@Schema()
export class EmailTemplate {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  message: string;
}

export const EmailTemplateSchema = SchemaFactory.createForClass(EmailTemplate);
