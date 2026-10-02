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
exports.SessionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const constants_1 = require("../../../../domain/constants");
const session_service_1 = require("../../application/services/session.service");
let SessionGuard = class SessionGuard {
    sessionService;
    reflector;
    constructor(sessionService, reflector) {
        this.sessionService = sessionService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const role = this.reflector.getAllAndOverride(constants_1.SESSION_ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest();
        const payload = request[constants_1.JWT_PAYLOAD];
        if (!payload?.sid) {
            throw new common_1.UnauthorizedException();
        }
        const session = await this.sessionService.get(constants_1.SESSION_KEYS[role], payload.sid);
        if (!session) {
            throw new common_1.UnauthorizedException("Session expired or revoked");
        }
        request.adminId = session.adminId;
        return true;
    }
};
exports.SessionGuard = SessionGuard;
exports.SessionGuard = SessionGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [session_service_1.SessionService,
        core_1.Reflector])
], SessionGuard);
//# sourceMappingURL=session.guard.js.map