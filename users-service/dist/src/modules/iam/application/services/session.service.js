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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const node_crypto_1 = require("node:crypto");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../domain/constants");
let SessionService = class SessionService {
    sessionStore;
    constructor(sessionStore) {
        this.sessionStore = sessionStore;
    }
    async create(key, id) {
        const sessionId = (0, node_crypto_1.randomUUID)();
        await this.sessionStore.set(`${key}:${sessionId}`, JSON.stringify({
            id,
        }), constants_1.SESSION_TTL);
        return sessionId;
    }
    async get(key, sessionId) {
        const value = (await this.sessionStore.get(`${key}:${sessionId}`));
        if (!value) {
            return null;
        }
        return JSON.parse(value);
    }
    async delete(sessionId) {
        await this.sessionStore.delete(`admin:session:${sessionId}`);
    }
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.SESSION_STORE)),
    __metadata("design:paramtypes", [Object])
], SessionService);
//# sourceMappingURL=session.service.js.map