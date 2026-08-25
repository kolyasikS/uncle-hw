import { User } from "../../domain/domain/entities/user.entity";
import { type UserRepository } from "../../domain/domain/interfaces/user.interface";
export declare class DeleteUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(id: string): Promise<User>;
}
