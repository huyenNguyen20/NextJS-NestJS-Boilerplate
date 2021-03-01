import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailTemplateSchema } from './schemas/emailTemplate.schema';
import { EmailController } from './email.controller';
@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'Email', schema: EmailTemplateSchema }]),
  ],
  providers: [EmailService],
  exports: [
    EmailService,
    MongooseModule.forFeature([{ name: 'Email', schema: EmailTemplateSchema }]),
  ],
  controllers: [EmailController],
})
export class EmailModule {}
