import { type UserRepository } from "../../domain/domain/interfaces/user.interface";
export declare class GetUsersUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(): Promise<import("../../domain/domain/entities/user.entity").User[]>;
}
