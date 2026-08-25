// user.mapper.ts

import { UserModel as PrismaUser } from "@db/generated/prisma/models";
import { User } from "@/modules/users/domain/domain/entities/user.entity";

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return new User(prismaUser.id, prismaUser.email);
  }

  static toPersistence(user: User) {
    return {
      email: user.email,
    };
  }
}
