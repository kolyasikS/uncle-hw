import { User } from "../../../../../db/generated/prisma/client";
import { type UserRepository } from "../../domain/domain/interfaces/user.interface";
export declare class GetUserByIdUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(id: string): Promise<User>;
}
