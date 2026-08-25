import { UserModel as PrismaUser } from "../../../../../db/generated/prisma/models";
import { User } from "../../../users/domain/domain/entities/user.entity";
export declare class UserMapper {
    static toDomain(prismaUser: PrismaUser): User;
    static toPersistence(user: User): {
        email: string;
    };
}
