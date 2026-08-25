import { User } from "@db/generated/prisma/client";
import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "@/domain/constants";
import { UserNotFoundException } from "@/domain/exceptions/domain.exceptions";
import { type UserRepository } from "@/modules/users/domain/domain/interfaces/user.interface";

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new UserNotFoundException(id);
    }

    return user;
  }
}
