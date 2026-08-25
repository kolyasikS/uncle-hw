"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../domain/constants");
const prisma_service_1 = require("./prisma/prisma.service");
const redis_service_1 = require("./redis/redis.service");
let DatabaseModule = DatabaseModule_1 = class DatabaseModule {
    static forRootAsync({ dbURL, redisURL, }) {
        return {
            module: DatabaseModule_1,
            controllers: [],
            providers: [
                { provide: constants_1.DATABASE_URL_SYMBOL, useValue: dbURL },
                { provide: constants_1.REDIS_URL_SYMBOL, useValue: redisURL },
                prisma_service_1.PrismaService,
                redis_service_1.RedisService,
            ],
            exports: [prisma_service_1.PrismaService, redis_service_1.RedisService],
        };
    }
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = DatabaseModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], DatabaseModule);
//# sourceMappingURL=database.module.js.map