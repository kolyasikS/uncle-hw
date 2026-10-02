import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "@/domain/constants";
import { User } from "@/modules/users/domain/domain/entities/user.entity";
import { type UserRepository } from "@/modules/users/domain/domain/interfaces/user.interface";

@Injectable()
export class GetUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(adminId: string): Promise<User[]> {
    const users = await this.userRepository.getByAdminId(adminId);

    return users;
  }
}
