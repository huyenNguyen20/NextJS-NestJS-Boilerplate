import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmailTemplate } from './interface/emailTemplate.interface';
import { respMessage } from '../shared/interfaces/respMessage.interface';
import { Model } from 'mongoose';
import * as lodash from 'lodash';

require('dotenv').config();
@Injectable()
export class EmailService {
  constructor(
    @InjectModel('Email') private EmailTemplateModel: Model<EmailTemplate>,
  ) {}

  sendEmail(options: any): Promise<any> {
    // 1. Configure Simple Email Service using aws-sdk
    const aws = require('aws-sdk');
    const ses = new aws.SES({
      apiVersion: 'latest',
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESSKEYID,
      secretAccessKey: process.env.AWS_SECRETACCESSKEY,
    });

    // 2. The function returns a promise which will fullfill when email is sent successfully
    return new Promise((resolve, reject) => {
      ses.sendEmail(
        {
          Source: options.from,
          Destination: {
            ToAddresses: options.to,
          },
          Message: {
            Subject: {
              Data: options.subject,
            },
            Body: {
              Html: {
                Data: options.body,
              },
            },
          },
        },
        (err, info) => {
          if (err) {
            reject(err);
          } else {
            resolve(info);
          }
        },
      );
    });
  }

  async insertEmailTemplate(): Promise<void> {
    const emailTemplates = [
      {
        name: 'welcome',
        subject: 'Welcome to NestJS-NextJSTemplate Website!',
        message: `<%= displayName%>,
              <p>Thank you for signing up for NestJS-NextJSTemplate Template </p>
              <p>I hope that you would enjoying using our website</p>
              <p>Huyen Nguyen</p>
              `,
      },
      {
        name: 'confirm',
        subject: 'Please confirm your email to activate your email at Mern!',
        message: `<%= displayName%>,
              <p>Thank you for signing up for NestJS-NextJSTemplate Template! </p>
              <p>In order for us to give you the best expriences at Mern, please confirm your email by clicking the link below</p>
              <p><%= CONFIRM_URL%></p>
              <p>Thank you so much for your cooperation!</p>
              <p>Huyen Nguyen</p>
              `,
      },
      {
        name: 'reset_password',
        subject: 'Reset Password',
        message: `<%= displayName%>,
              <p>Please click the link below to reset your password</p>
              <p><%= RESET_PASSWORD_URL%></p>
              <p>Thank you so much for your cooperation!</p>
              <p>Huyen Nguyen</p>
              `,
      },
    ];
    let name;
    let subject;
    let message;
    for (const t of emailTemplates) { //eslint-disable-line
      // 1. Call "findOne" to find if an email template exists
      name = t.name.replace(/\n/g, ' ').replace(/[ ]/g, ' ').trim();
      message = t.message.replace(/\n/g, ' ').replace(/[ ]/g, ' ').trim();
      subject = t.subject.replace(/\n/g, ' ').replace(/[ ]/g, ' ').trim();
      const et = await this.EmailTemplateModel.findOne({ name }); //eslint-disable-line
      // 2. If it exists, use "updateOne" to update new subject or body
      if (et) {
        if (subject !== et.subject || message !== et.message) {
          await this.EmailTemplateModel.updateOne({ _id: et._id }, { $set: { message, subject } }); //eslint-disable-line
        }
      }
      // 3. If not, use "create" to insert the new template into the DB
      else {
        await this.EmailTemplateModel.create({ name, subject, message }); //eslint-disable-line
      }
    }
  }

  async getEmailTemplate(name: string, params: any): Promise<respMessage> {
    try {
      await this.insertEmailTemplate();
      // 1. Use "findOne" to find one email template with the corresponding name
      const et = await this.EmailTemplateModel.findOne({ name });
      // 2. If there is one, update the template with the corresponding params
      if (et) {
        return {
          success: true,
          response: {
            template: {
              subject: lodash.template(et.subject)(params),
              message: lodash.template(et.message)(params),
            },
          },
        };
      }
      throw Error('No available email template.');
    } catch (err) {
      // 3. Otherwise, throw an error
      return {
        success: false,
        response: {
          message: err.message || err.toString(),
        },
      };
    }
  }

  async sendTemplateEmail(
    tempName: string,
    params: any,
    emailAdd: string,
  ): Promise<respMessage> {
    try {
      // 1. Use getEmailTemplate to populate options object with the template
      const et = await this.getEmailTemplate(tempName, params);
      // 2. If yes, Use sendEmail to send an new email to the users
      if (et.success) {
        await this.sendEmail({
          from: `Huyen from NestJS-NextJS Template <${process.env.EMAIL_ADDRESS_FROM}>`,
          to: [emailAdd],
          subject: et.response.template.subject,
          body: et.response.template.message,
        });
      } else throw new Error('Email template is not available');
      return {
        success: true,
        response: {
          message: 'Email has been sent successfully. Please check your email!',
        },
      };
    } catch (err) {
      // 3. If not, logging out the error
      return {
        success: false,
        response: { message: err.message || err.toString() },
      };
    }
  }
}
