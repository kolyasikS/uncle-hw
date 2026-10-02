import { OtpModel as PrismaOtp } from "@db/generated/prisma/models";
import { Otp } from "@/modules/otp/domain/entities/otp.entity";

export class OtpMapper {
  static toDomain(prismaOtp: PrismaOtp): Otp {
    return new Otp(
      prismaOtp.id,
      prismaOtp.email,
      prismaOtp.code,
      prismaOtp.createdAt,
    );
  }

  static toPersistence(otp: Otp) {
    return {
      email: otp.email,
      code: otp.code,
      createdAt: otp.createdAt,
    };
  }
}
