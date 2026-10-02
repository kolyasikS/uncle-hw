import { AdminModel as PrismaAdmin } from "../../../../../db/generated/prisma/models";
import { Admin, AdminHttp } from "../../domain/entities/admin.entity";
export declare class AdminMapper {
    static toDomain(prismaAdmin: PrismaAdmin): Admin;
    static toPersistence(admin: Admin): {
        email: string;
        password: string;
    };
    static toHttp(admin: Admin): AdminHttp;
}
