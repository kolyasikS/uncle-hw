"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../domain/constants");
const admin_module_1 = require("../../admins/domain/admin.module");
const admin_login_use_case_1 = require("../application/use-cases/admin-login.use-case");
const auth_controller_1 = require("../presentation/auth.controller");
const session_service_1 = require("../../iam/application/services/session.service");
const iam_module_1 = require("../../iam/domain/iam.module");
const redis_session_repository_1 = require("../../iam/infrastructure/repositories/redis-session.repository");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [admin_module_1.AdminModule, iam_module_1.IamModule],
        controllers: [auth_controller_1.AuthController],
        providers: [
            admin_login_use_case_1.AdminLoginUseCase,
            session_service_1.SessionService,
            {
                provide: constants_1.SESSION_STORE,
                useClass: redis_session_repository_1.RedisSessionRepository,
            },
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map