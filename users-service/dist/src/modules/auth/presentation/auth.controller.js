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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const api_response_1 = require("../../../domain/api-response");
const constants_1 = require("../../../domain/constants");
const admin_messages_1 = require("../../../domain/messages/admin.messages");
const auth_messages_1 = require("../../../domain/messages/auth.messages");
const otp_messages_1 = require("../../../domain/messages/otp.messages");
const admin_mapper_1 = require("../../admins/infrastructure/mappers/admin.mapper");
const admin_confirm_code_dto_1 = require("../application/dto/admin-confirm-code.dto");
const admin_login_dto_1 = require("../application/dto/admin-login.dto");
const admin_signup_dto_1 = require("../application/dto/admin-signup.dto");
const admin_confirm_code_use_case_1 = require("../application/use-cases/admin-confirm-code.use-case");
const admin_login_use_case_1 = require("../application/use-cases/admin-login.use-case");
const admin_send_registration_code_use_case_1 = require("../application/use-cases/admin-send-registration-code.use-case");
const admin_signup_use_case_1 = require("../application/use-cases/admin-signup.use-case");
const auth_decorator_1 = require("../../iam/domain/decorators/auth.decorator");
let AuthController = class AuthController {
    adminLoginUseCase;
    adminSignUpUseCase;
    adminSendEmailUseCase;
    adminConfirmCodeUseCase;
    constructor(adminLoginUseCase, adminSignUpUseCase, adminSendEmailUseCase, adminConfirmCodeUseCase) {
        this.adminLoginUseCase = adminLoginUseCase;
        this.adminSignUpUseCase = adminSignUpUseCase;
        this.adminSendEmailUseCase = adminSendEmailUseCase;
        this.adminConfirmCodeUseCase = adminConfirmCodeUseCase;
    }
    async adminLogin(adminLoginDto, res) {
        const { admin, accessToken } = await this.adminLoginUseCase.execute(adminLoginDto);
        res.cookie(constants_1.AUTH_COOKIE_NAME, accessToken, {
            httpOnly: true,
            secure: constants_1.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000,
            path: "/",
        });
        return api_response_1.ApiResponse.success({
            data: admin,
            message: auth_messages_1.loginMessages.success,
            statusCode: common_1.HttpStatus.OK,
        });
    }
    async adminSendCodeRegistrationEmail(adminSendEmailDto) {
        await this.adminSendEmailUseCase.execute(adminSendEmailDto);
        return api_response_1.ApiResponse.success({
            data: true,
            message: auth_messages_1.sendEmailMessages.success,
            statusCode: common_1.HttpStatus.OK,
        });
    }
    async adminConfirmRegistrationCode(adminConfirmCodeDto) {
        await this.adminConfirmCodeUseCase.execute(adminConfirmCodeDto);
        return api_response_1.ApiResponse.success({
            data: true,
            message: otp_messages_1.otpVerificationMessages.success,
            statusCode: common_1.HttpStatus.OK,
        });
    }
    async verify() {
        return api_response_1.ApiResponse.success({
            data: true,
            message: auth_messages_1.tokenVerificationMessages.success,
            statusCode: common_1.HttpStatus.OK,
        });
    }
    async adminSignUp(adminSignUpDto, res) {
        const { admin, accessToken } = await this.adminSignUpUseCase.execute(adminSignUpDto);
        res.cookie(constants_1.AUTH_COOKIE_NAME, accessToken, {
            httpOnly: true,
            secure: constants_1.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000,
            path: "/",
        });
        return api_response_1.ApiResponse.success({
            data: admin_mapper_1.AdminMapper.toHttp(admin),
            message: admin_messages_1.signUpAdminMessages.success,
            statusCode: common_1.HttpStatus.OK,
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("/admin/login"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_login_dto_1.AdminLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminLogin", null);
__decorate([
    (0, common_1.Post)("/admin/emails"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_login_dto_1.AdminLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminSendCodeRegistrationEmail", null);
__decorate([
    (0, common_1.Post)("/admin/codes/verify"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_confirm_code_dto_1.AdminConfirmCodeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminConfirmRegistrationCode", null);
__decorate([
    (0, auth_decorator_1.Session)(constants_1.ROLES.ADMIN),
    (0, common_1.Post)("/verify"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)("/admin/sign-up"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_signup_dto_1.AdminSignUpDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminSignUp", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [admin_login_use_case_1.AdminLoginUseCase,
        admin_signup_use_case_1.AdminSignUpUseCase,
        admin_send_registration_code_use_case_1.AdminSendRegistrationCodeUseCase,
        admin_confirm_code_use_case_1.AdminConfirmCodeUseCase])
], AuthController);
//# sourceMappingURL=auth.controller.js.map