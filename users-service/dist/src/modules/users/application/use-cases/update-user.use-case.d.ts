import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../../domain/domain/entities/user.entity";
import { type UserRepository } from "../../domain/domain/interfaces/user.interface";
export declare class UpdateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(id: string, dto: UpdateUserDto): Promise<User>;
}
