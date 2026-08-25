import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infrastructure/databases/prisma/prisma.service";
import { Admin } from "@/modules/admins/domain/entities/admin.entity";
import { AdminRepository } from "@/modules/admins/domain/interfaces/admin.interface";
import { AdminMapper } from "@/modules/admins/infrastructure/mappers/admin.mapper";

@Injectable()
export class PrismaAdminRepository implements AdminRepository {
  constructor(readonly prisma: PrismaService) {}

  async getByEmail(email: string): Promise<Admin | null> {
    const found = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (!found) {
      return null;
    }

    return AdminMapper.toDomain(found);
  }
}
