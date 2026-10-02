import { type Response } from "express";
import { type ApiResponseType } from "../../../domain/api-response";
import { Admin, AdminHttp } from "../../admins/domain/entities/admin.entity";
import { AdminConfirmCodeDto } from "../application/dto/admin-confirm-code.dto";
import { AdminLoginDto } from "../application/dto/admin-login.dto";
import { AdminSignUpDto } from "../application/dto/admin-signup.dto";
import { AdminConfirmCodeUseCase } from "../application/use-cases/admin-confirm-code.use-case";
import { AdminLoginUseCase } from "../application/use-cases/admin-login.use-case";
import { AdminSendRegistrationCodeUseCase } from "../application/use-cases/admin-send-registration-code.use-case";
import { AdminSignUpUseCase } from "../application/use-cases/admin-signup.use-case";
export declare class AuthController {
    private readonly adminLoginUseCase;
    private readonly adminSignUpUseCase;
    private readonly adminSendEmailUseCase;
    private readonly adminConfirmCodeUseCase;
    constructor(adminLoginUseCase: AdminLoginUseCase, adminSignUpUseCase: AdminSignUpUseCase, adminSendEmailUseCase: AdminSendRegistrationCodeUseCase, adminConfirmCodeUseCase: AdminConfirmCodeUseCase);
    adminLogin(adminLoginDto: AdminLoginDto, res: Response): Promise<ApiResponseType<Admin>>;
    adminSendCodeRegistrationEmail(adminSendEmailDto: AdminLoginDto): Promise<ApiResponseType<boolean>>;
    adminConfirmRegistrationCode(adminConfirmCodeDto: AdminConfirmCodeDto): Promise<ApiResponseType<boolean>>;
    verify(): Promise<ApiResponseType<boolean>>;
    adminSignUp(adminSignUpDto: AdminSignUpDto, res: Response): Promise<ApiResponseType<AdminHttp>>;
}
