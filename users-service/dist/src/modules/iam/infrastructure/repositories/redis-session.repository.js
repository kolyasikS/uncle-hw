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
exports.RedisSessionRepository = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../domain/constants");
const redis_service_1 = require("../../../../infrastructure/databases/redis/redis.service");
let RedisSessionRepository = class RedisSessionRepository {
    redis;
    constructor(redis) {
        this.redis = redis;
    }
    async set(id, role) {
        await this.redis.set(id, role, constants_1.SESSION_TTL);
    }
    async get(key) {
        return await this.redis.get(key);
    }
    async delete(key) {
        await this.redis.delete(key);
    }
};
exports.RedisSessionRepository = RedisSessionRepository;
exports.RedisSessionRepository = RedisSessionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], RedisSessionRepository);
//# sourceMappingURL=redis-session.repository.js.map