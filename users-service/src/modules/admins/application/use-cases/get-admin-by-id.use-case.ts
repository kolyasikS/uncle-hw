import { Inject, Injectable } from "@nestjs/common";
import { ADMIN_REPOSITORY } from "@/domain/constants";
import { AdminNotFoundException } from "@/domain/exceptions/domain.exceptions";
import { type AdminRepository } from "@/modules/admins/domain/interfaces/admin.interface";
import { AdminLoginDto } from "@/modules/auth/application/dto/admin-login.dto";

@Injectable()
export class GetAdminByIdUseCase {
  constructor(
    @Inject(ADMIN_REPOSITORY)
    private readonly adminRepository: AdminRepository,
  ) {}

  async execute(dto: AdminLoginDto) {
    const existingAdmin = await this.adminRepository.getByEmail(dto.email);

    if (!existingAdmin) {
      throw new AdminNotFoundException(dto.email);
    }

    return existingAdmin;
  }
}
