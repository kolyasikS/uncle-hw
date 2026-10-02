import { Injectable } from "@nestjs/common";
import { AdminSendEmailDto } from "@/modules/auth/application/dto/admin-send-email.dto";
import { MailService } from "@/modules/mail/application/services/mail.service";
import { OtpService } from "@/modules/otp/application/services/otp.service";

@Injectable()
export class AdminSendRegistrationCodeUseCase {
  constructor(
    private readonly mailService: MailService,
    private readonly otpService: OtpService,
  ) {}

  async execute({ email }: AdminSendEmailDto) {
    const otp = await this.otpService.createOtp({ email });

    await this.mailService.sendEmail({
      to: email,
      subject: "Your code for registration",
      html: `<h1>Your code - ${otp.code}</h1>`,
    });

    return true;
  }
}
