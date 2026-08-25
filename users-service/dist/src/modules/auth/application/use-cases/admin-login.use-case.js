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
exports.AdminLoginUseCase = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../../../../domain/constants");
const domain_exceptions_1 = require("../../../../domain/exceptions/domain.exceptions");
const utils_1 = require("../../../admins/application/utils");
const session_service_1 = require("../../../iam/application/services/session.service");
let AdminLoginUseCase = class AdminLoginUseCase {
    adminRepository;
    sessionService;
    jwtService;
    constructor(adminRepository, sessionService, jwtService) {
        this.adminRepository = adminRepository;
        this.sessionService = sessionService;
        this.jwtService = jwtService;
    }
    async execute(adminLoginDto) {
        const admin = await this.adminRepository.getByEmail(adminLoginDto.email);
        if (!admin) {
            throw new domain_exceptions_1.InvalidCredentialsException();
        }
        const passwordValid = await (0, utils_1.checkPassword)(admin.password, adminLoginDto.password);
        if (!passwordValid) {
            throw new domain_exceptions_1.InvalidCredentialsException();
        }
        const sessionId = await this.sessionService.create(constants_1.ADMIN_SESSION_KEY, admin.id);
        const accessToken = await this.jwtService.signAsync({
            sub: admin.id,
            sid: sessionId,
            role: constants_1.ROLES.ADMIN,
        });
        return accessToken;
    }
};
exports.AdminLoginUseCase = AdminLoginUseCase;
exports.AdminLoginUseCase = AdminLoginUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.ADMIN_REPOSITORY)),
    __metadata("design:paramtypes", [Object, session_service_1.SessionService,
        jwt_1.JwtService])
], AdminLoginUseCase);
//# sourceMappingURL=admin-login.use-case.js.map