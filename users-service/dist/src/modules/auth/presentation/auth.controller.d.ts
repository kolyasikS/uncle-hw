import { type Response } from "express";
import { type ApiResponseType } from "../../../domain/api-response";
import { AdminLoginDto } from "../application/dto/admin-login.dto";
import { AdminLoginUseCase } from "../application/use-cases/admin-login.use-case";
export declare class AuthController {
    private readonly adminLoginUseCase;
    constructor(adminLoginUseCase: AdminLoginUseCase);
    adminLogin(adminLoginDto: AdminLoginDto, res: Response): Promise<ApiResponseType<boolean>>;
    verify(): Promise<ApiResponseType<boolean>>;
}
