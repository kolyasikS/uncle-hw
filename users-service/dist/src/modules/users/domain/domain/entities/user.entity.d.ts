import { CreateUserDto } from "../../../application/dto/create-user.dto";
import { UpdateUserDto } from "../../../application/dto/update-user.dto";
export declare class User {
    readonly id: string;
    readonly email: string;
    constructor(id: string, email: string);
    static create(createUserDto: CreateUserDto): User;
    static update(existingUser: User, updateUserDto: UpdateUserDto): User;
}
