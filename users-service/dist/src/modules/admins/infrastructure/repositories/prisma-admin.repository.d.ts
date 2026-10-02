import { PrismaService } from "../../../../infrastructure/databases/prisma/prisma.service";
import { Admin } from "../../domain/entities/admin.entity";
import { AdminRepository } from "../../domain/interfaces/admin.interface";
export declare class PrismaAdminRepository implements AdminRepository {
    readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    getByEmail(email: string): Promise<Admin | null>;
    create(admin: Admin): Promise<Admin>;
}
