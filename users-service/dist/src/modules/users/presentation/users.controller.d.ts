import { type ApiResponseType } from "../../../domain/api-response";
import { CreateUserDto } from "../application/dto/create-user.dto";
import { type UpdateUserDto } from "../application/dto/update-user.dto";
import { CreateUserUseCase } from "../application/use-cases/create-user.use-case";
import { DeleteUserUseCase } from "../application/use-cases/delete-user.use-case";
import { GetUserByIdUseCase } from "../application/use-cases/get-user-by-id.use-case";
import { GetUsersUseCase } from "../application/use-cases/get-users.use-case";
import { UpdateUserUseCase } from "../application/use-cases/update-user.use-case";
import { User } from "../domain/domain/entities/user.entity";
export declare class UsersController {
    private readonly getUsersUseCase;
    private readonly createUserUseCase;
    private readonly getUserByIdUseCase;
    private readonly updateUserUseCase;
    private readonly deleteUserUseCase;
    constructor(getUsersUseCase: GetUsersUseCase, createUserUseCase: CreateUserUseCase, getUserByIdUseCase: GetUserByIdUseCase, updateUserUseCase: UpdateUserUseCase, deleteUserUseCase: DeleteUserUseCase);
    create(createUserDto: CreateUserDto): Promise<ApiResponseType<User>>;
    getAll(adminId: string): Promise<ApiResponseType<User[]>>;
    getUserById(id: string): Promise<ApiResponseType<User | null>>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<ApiResponseType<User>>;
    delete(id: string): Promise<ApiResponseType<User>>;
}
