import { type EventBus } from "../../../../domain/interfaces/event-bus.interface";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../../domain/domain/entities/user.entity";
import { type UserRepository } from "../../domain/domain/interfaces/user.interface";
export declare class CreateUserUseCase {
    private readonly userRepository;
    private readonly eventBus;
    constructor(userRepository: UserRepository, eventBus: EventBus);
    execute(dto: CreateUserDto): Promise<User>;
}
