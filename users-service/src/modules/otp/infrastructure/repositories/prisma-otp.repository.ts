import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infrastructure/databases/prisma/prisma.service";
import { Otp } from "@/modules/otp/domain/entities/otp.entity";
import { OtpRepository } from "@/modules/otp/domain/interfaces/otp.interface";
import { OtpMapper } from "@/modules/otp/infrastructure/mappers/otp.mapper";

@Injectable()
export class PrismaOtpRepository implements OtpRepository {
  constructor(readonly prisma: PrismaService) {}

  async create(otp: Otp): Promise<Otp> {
    const data = OtpMapper.toPersistence(otp);

    const created = await this.prisma.otp.create({
      data,
    });

    return OtpMapper.toDomain(created);
  }

  async getByEmail(email: string): Promise<Otp | null> {
    const otp = await this.prisma.otp.findFirst({
      where: { email },
      orderBy: { createdAt: "desc" },
    });

    if (!otp) {
      return null;
    }
    return OtpMapper.toDomain(otp);
  }
}
