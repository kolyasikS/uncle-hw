import { Module } from "@nestjs/common";
import { ADMIN_REPOSITORY } from "@/domain/constants";
import { CreateAdminUseCase } from "@/modules/admins/application/use-cases/create-admin.use-case";
import { GetAdminByIdUseCase } from "@/modules/admins/application/use-cases/get-admin-by-id.use-case";
import { PrismaAdminRepository } from "@/modules/admins/infrastructure/repositories/prisma-admin.repository";

@Module({
  providers: [
    GetAdminByIdUseCase,
    CreateAdminUseCase,
    {
      provide: ADMIN_REPOSITORY,
      useClass: PrismaAdminRepository,
    },
  ],
  exports: [
    GetAdminByIdUseCase,
    CreateAdminUseCase,
    {
      provide: ADMIN_REPOSITORY,
      useClass: PrismaAdminRepository,
    },
  ],
})
export class AdminModule {}
