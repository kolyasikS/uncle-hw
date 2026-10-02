import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { MAIL_FROM } from "@/domain/constants";
import { SendEmailDto } from "@/modules/mail/application/dto/send-email.dto";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail({ to, subject, html }: SendEmailDto) {
    await this.mailerService.sendMail({
      from: MAIL_FROM,
      to: to,
      subject: subject,
      html: html,
    });
  }
}
