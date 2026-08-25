import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "@/domain/constants";
import { type UserRepository } from "@/modules/users/domain/domain/interfaces/user.interface";

@Injectable()
export class GetUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute() {
    const users = await this.userRepository.getAll();

    return users;
  }
}
