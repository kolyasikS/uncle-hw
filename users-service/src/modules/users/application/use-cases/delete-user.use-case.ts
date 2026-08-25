import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "@/domain/constants";
import { UserNotFoundException } from "@/domain/exceptions/domain.exceptions";
import { User } from "@/modules/users/domain/domain/entities/user.entity";
import { type UserRepository } from "@/modules/users/domain/domain/interfaces/user.interface";

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const existingUser = await this.userRepository.getById(id);
    if (!existingUser) {
      throw new UserNotFoundException(id);
    }

    return this.userRepository.delete(id);
  }
}
