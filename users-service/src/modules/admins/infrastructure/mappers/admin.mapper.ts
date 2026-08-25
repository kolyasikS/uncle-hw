import { AdminModel as PrismaAdmin } from "@db/generated/prisma/models";
import { Admin } from "@/modules/admins/domain/entities/admin.entity";

export class AdminMapper {
  static toDomain(prismaAdmin: PrismaAdmin): Admin {
    return new Admin(prismaAdmin.id, prismaAdmin.email, prismaAdmin.password);
  }

  static toPersistence(admin: Admin) {
    return {
      email: admin.email,
    };
  }
}
