import { Inject, Injectable } from "@nestjs/common";
import { ADMIN_REPOSITORY } from "@/domain/constants";
import { AdminAlreadyExistsException } from "@/domain/exceptions/domain.exceptions";
import { CreateAdminDto } from "@/modules/admins/application/dto/create-admin.dto";
import { Admin } from "@/modules/admins/domain/entities/admin.entity";
import { type AdminRepository } from "@/modules/admins/domain/interfaces/admin.interface";

@Injectable()
export class CreateAdminUseCase {
  constructor(
    @Inject(ADMIN_REPOSITORY)
    private readonly adminRepository: AdminRepository,
  ) {}

  async execute({ email, password }: CreateAdminDto) {
    const existingAdmin = await this.adminRepository.getByEmail(email);
    if (existingAdmin) {
      throw new AdminAlreadyExistsException(email);
    }

    const admin = await Admin.create({ email, password });
    const newAdmin = await this.adminRepository.create(admin);

    return newAdmin;
  }
}
