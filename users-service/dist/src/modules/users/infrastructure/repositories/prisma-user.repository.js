"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../infrastructure/databases/prisma/prisma.service");
const user_mapper_1 = require("../mappers/user.mapper");
let PrismaUserRepository = class PrismaUserRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(user) {
        const data = user_mapper_1.UserMapper.toPersistence(user);
        console.log("data", data);
        const created = await this.prisma.user.create({
            data,
        });
        return user_mapper_1.UserMapper.toDomain(created);
    }
    async getAll() {
        const found = await this.prisma.user.findMany();
        return found.map((user) => user_mapper_1.UserMapper.toDomain(user));
    }
    async getByAdminId(adminId) {
        const found = await this.prisma.user.findMany({
            where: { adminId },
        });
        return found.map((user) => user_mapper_1.UserMapper.toDomain(user));
    }
    async getByEmail(email) {
        const found = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!found) {
            return null;
        }
        return user_mapper_1.UserMapper.toDomain(found);
    }
    async getById(id) {
        const found = await this.prisma.user.findUnique({ where: { id } });
        if (!found) {
            return null;
        }
        return user_mapper_1.UserMapper.toDomain(found);
    }
    async update(user) {
        const data = user_mapper_1.UserMapper.toPersistence(user);
        const updated = await this.prisma.user.update({
            where: { id: user.id },
            data,
        });
        return user_mapper_1.UserMapper.toDomain(updated);
    }
    async delete(id) {
        const deleted = await this.prisma.user.delete({
            where: { id },
        });
        return user_mapper_1.UserMapper.toDomain(deleted);
    }
};
exports.PrismaUserRepository = PrismaUserRepository;
exports.PrismaUserRepository = PrismaUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUserRepository);
//# sourceMappingURL=prisma-user.repository.js.map