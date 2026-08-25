import { Module } from "@nestjs/common";
import { ADMIN_REPOSITORY } from "@/domain/constants";
import { GetAdminByIdUseCase } from "@/modules/admins/application/use-cases/get-admin-by-id.use-case";
import { PrismaAdminRepository } from "@/modules/admins/infrastructure/repositories/prisma-admin.repository";

@Module({
  providers: [
    GetAdminByIdUseCase,
    {
      provide: ADMIN_REPOSITORY,
      useClass: PrismaAdminRepository,
    },
  ],
  exports: [
    GetAdminByIdUseCase,
    {
      provide: ADMIN_REPOSITORY,
      useClass: PrismaAdminRepository,
    },
  ],
})
export class AdminModule {}
