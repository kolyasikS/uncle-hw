import { hashPassword } from "@/domain/utils";
import { CreateAdminDto } from "@/modules/admins/application/dto/create-admin.dto";

export class Admin {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  static async create(createUserDto: CreateAdminDto) {
    return new Admin(
      crypto.randomUUID(),
      createUserDto.email,
      await hashPassword(createUserDto.password),
    );
  }
}

export type AdminHttp = Pick<Admin, "email">;
