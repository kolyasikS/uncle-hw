import { generateAlphanumericCode } from "@/domain/utils";
import { CreateOtpDto } from "@/modules/otp/application/dto/create-otp.dto";

export class Otp {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly code: string,
    public readonly createdAt: Date,
  ) {}

  static create(createOtpDto: CreateOtpDto) {
    return new Otp(
      crypto.randomUUID(),
      createOtpDto.email,
      generateAlphanumericCode(6),
      new Date(),
    );
  }
}
