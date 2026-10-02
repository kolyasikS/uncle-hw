import { Inject, Injectable } from "@nestjs/common";
import { OTP_REPOSITORY, OTP_TTL } from "@/domain/constants";
import {
  ExpiredOtpException,
  InvalidOtpException,
} from "@/domain/exceptions/domain.exceptions";
import { CreateOtpDto } from "@/modules/otp/application/dto/create-otp.dto";
import { VerifyOtpDto } from "@/modules/otp/application/dto/veify-otp.dto";
import { Otp } from "@/modules/otp/domain/entities/otp.entity";
import { type OtpRepository } from "@/modules/otp/domain/interfaces/otp.interface";

@Injectable()
export class OtpService {
  constructor(
    @Inject(OTP_REPOSITORY)
    private readonly otpRepository: OtpRepository,
  ) {}

  async createOtp({ email }: CreateOtpDto) {
    const otp = Otp.create({
      email,
    });

    return await this.otpRepository.create(otp);
  }

  async verifyOtp({ email, code }: VerifyOtpDto) {
    const otp = await this.otpRepository.getByEmail(email);

    if (!otp || otp.code !== code) {
      throw new InvalidOtpException();
    }

    if ((Date.now() - otp.createdAt.getTime()) / 1000 > OTP_TTL) {
      throw new ExpiredOtpException();
    }

    return otp;
  }
}
