import { User } from "../entities/user.entity";
export interface UserRepository {
    create(user: User): Promise<User>;
    getAll(): Promise<User[]>;
    getByEmail(email: string): Promise<User | null>;
    getById(id: string): Promise<User | null>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<User>;
}
