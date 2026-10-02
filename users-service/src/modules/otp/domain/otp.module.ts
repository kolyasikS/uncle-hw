import { Module } from "@nestjs/common";
import { OTP_REPOSITORY } from "@/domain/constants";
import { OtpService } from "@/modules/otp/application/services/otp.service";
import { PrismaOtpRepository } from "@/modules/otp/infrastructure/repositories/prisma-otp.repository";

@Module({
  providers: [
    OtpService,
    {
      provide: OTP_REPOSITORY,
      useClass: PrismaOtpRepository,
    },
  ],
  exports: [OtpService],
})
export class OtpModule {}
