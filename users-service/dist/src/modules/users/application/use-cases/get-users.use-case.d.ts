import { User } from "../../domain/domain/entities/user.entity";
import { type UserRepository } from "../../domain/domain/interfaces/user.interface";
export declare class GetUsersUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(adminId: string): Promise<User[]>;
}
