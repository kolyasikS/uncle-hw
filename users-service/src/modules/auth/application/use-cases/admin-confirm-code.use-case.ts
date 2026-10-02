import { Injectable } from "@nestjs/common";
import { AdminConfirmCodeDto } from "@/modules/auth/application/dto/admin-confirm-code.dto";
import { OtpService } from "@/modules/otp/application/services/otp.service";

@Injectable()
export class AdminConfirmCodeUseCase {
  constructor(private readonly otpService: OtpService) {}

  async execute({ email, code }: AdminConfirmCodeDto) {
    const otp = await this.otpService.verifyOtp({ email, code });

    return otp;
  }
}
