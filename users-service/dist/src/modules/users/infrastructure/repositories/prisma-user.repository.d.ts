import { PrismaService } from "../../../../infrastructure/databases/prisma/prisma.service";
import { User } from "../../domain/domain/entities/user.entity";
import { UserRepository } from "../../domain/domain/interfaces/user.interface";
export declare class PrismaUserRepository implements UserRepository {
    readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    create(user: User): Promise<User>;
    getAll(): Promise<User[]>;
    getByAdminId(adminId: string): Promise<User[]>;
    getByEmail(email: string): Promise<User | null>;
    getById(id: string): Promise<User | null>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<User>;
}
