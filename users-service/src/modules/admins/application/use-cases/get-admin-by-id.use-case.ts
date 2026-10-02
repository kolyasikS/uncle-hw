import { Inject, Injectable } from "@nestjs/common";
import { ADMIN_REPOSITORY } from "@/domain/constants";
import { AdminNotFoundException } from "@/domain/exceptions/domain.exceptions";
import { GetAdminDto } from "@/modules/admins/application/dto/get-admin.dto";
import { type AdminRepository } from "@/modules/admins/domain/interfaces/admin.interface";

@Injectable()
export class GetAdminByIdUseCase {
  constructor(
    @Inject(ADMIN_REPOSITORY)
    private readonly adminRepository: AdminRepository,
  ) {}

  async execute(dto: GetAdminDto) {
    const existingAdmin = await this.adminRepository.getByEmail(dto.email);

    if (!existingAdmin) {
      throw new AdminNotFoundException(dto.email);
    }

    return existingAdmin;
  }
}
