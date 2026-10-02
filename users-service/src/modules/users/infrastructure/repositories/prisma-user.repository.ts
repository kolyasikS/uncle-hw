import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infrastructure/databases/prisma/prisma.service";
import { User } from "@/modules/users/domain/domain/entities/user.entity";
import { UserRepository } from "@/modules/users/domain/domain/interfaces/user.interface";
import { UserMapper } from "@/modules/users/infrastructure/mappers/user.mapper";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(readonly prisma: PrismaService) {}
  async create(user: User): Promise<User> {
    const data = UserMapper.toPersistence(user);
    console.log("data", data);
    const created = await this.prisma.user.create({
      data,
    });

    return UserMapper.toDomain(created);
  }

  async getAll(): Promise<User[]> {
    const found = await this.prisma.user.findMany();

    return found.map((user) => UserMapper.toDomain(user));
  }

  async getByAdminId(adminId: string): Promise<User[]> {
    const found = await this.prisma.user.findMany({
      where: { adminId },
    });

    return found.map((user) => UserMapper.toDomain(user));
  }

  async getByEmail(email: string): Promise<User | null> {
    const found = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!found) {
      return null;
    }

    return UserMapper.toDomain(found);
  }

  async getById(id: string): Promise<User | null> {
    const found = await this.prisma.user.findUnique({ where: { id } });

    if (!found) {
      return null;
    }

    return UserMapper.toDomain(found);
  }

  async update(user: User): Promise<User> {
    const data = UserMapper.toPersistence(user);

    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data,
    });

    return UserMapper.toDomain(updated);
  }

  async delete(id: string): Promise<User> {
    const deleted = await this.prisma.user.delete({
      where: { id },
    });

    return UserMapper.toDomain(deleted);
  }
}
