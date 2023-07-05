import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as otpGenerator from 'otp-generator';


@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

  async sendOtp(user: any, otp: string) {
    console.log(otp)
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './sendOtp.hbs',// `.hbs` extension is appended automatically
      context: { // ✏ filling curly brackets with content
        name: user.firstName + " " + user.lastName,
        otp
      },
    });
  }
}


const otp = otpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
console.log(otp);