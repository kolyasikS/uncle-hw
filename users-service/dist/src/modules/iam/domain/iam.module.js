"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IamModule = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../domain/constants");
const session_service_1 = require("../application/services/session.service");
const auth_guard_1 = require("./guards/auth.guard");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const session_guard_1 = require("./guards/session.guard");
const redis_session_repository_1 = require("../infrastructure/repositories/redis-session.repository");
let IamModule = class IamModule {
};
exports.IamModule = IamModule;
exports.IamModule = IamModule = __decorate([
    (0, common_1.Module)({
        providers: [
            jwt_auth_guard_1.JwtAuthGuard,
            session_guard_1.SessionGuard,
            auth_guard_1.AuthGuard,
            session_service_1.SessionService,
            {
                provide: constants_1.SESSION_STORE,
                useClass: redis_session_repository_1.RedisSessionRepository,
            },
        ],
        exports: [auth_guard_1.AuthGuard, jwt_auth_guard_1.JwtAuthGuard, session_guard_1.SessionGuard],
    })
], IamModule);
//# sourceMappingURL=iam.module.js.map