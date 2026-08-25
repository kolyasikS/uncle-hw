import { Inject, Injectable } from "@nestjs/common";
import { EVENT_BUS, USER_REPOSITORY } from "@/domain/constants";
import { UserAlreadyExistsException } from "@/domain/exceptions/domain.exceptions";
import { type EventBus } from "@/domain/interfaces/event-bus.interface";
import { CreateUserDto } from "@/modules/users/application/dto/create-user.dto";
import { UserCreatedEvent } from "@/modules/users/application/events/user-created.event";
import { User } from "@/modules/users/domain/domain/entities/user.entity";
import { type UserRepository } from "@/modules/users/domain/domain/interfaces/user.interface";

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
  ) {}

  async execute(dto: CreateUserDto) {
    const existingUser = await this.userRepository.getByEmail(dto.email);
    if (existingUser) {
      throw new UserAlreadyExistsException(dto.email);
    }

    const user = User.create({
      email: dto.email,
    });

    const newUser = await this.userRepository.create(user);

    await this.eventBus.publish([new UserCreatedEvent(newUser.id)]);

    return newUser;
  }
}
