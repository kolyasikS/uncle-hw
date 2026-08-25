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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
const constants_1 = require("../../../domain/constants");
let RedisService = class RedisService {
    url;
    redis;
    constructor(url) {
        this.url = url;
        this.redis = new ioredis_1.default(url);
    }
    async set(key, value, ttl) {
        if (ttl) {
            await this.redis.set(key, value, "EX", ttl);
            return;
        }
        await this.redis.set(key, value);
    }
    async get(key) {
        return this.redis.get(key);
    }
    async delete(key) {
        await this.redis.del(key);
    }
    async exists(key) {
        const result = await this.redis.exists(key);
        return result === 1;
    }
    async expire(key, seconds) {
        await this.redis.expire(key, seconds);
    }
    async onModuleDestroy() {
        await this.redis.quit();
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.REDIS_URL_SYMBOL)),
    __metadata("design:paramtypes", [String])
], RedisService);
//# sourceMappingURL=redis.service.js.map