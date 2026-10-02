import { JwtService } from "@nestjs/jwt";
import { GetAdminByIdUseCase } from "../../../admins/application/use-cases/get-admin-by-id.use-case";
import { AdminLoginDto } from "../dto/admin-login.dto";
import { SessionService } from "../../../iam/application/services/session.service";
export declare class AdminLoginUseCase {
    private readonly getAdminByIdUseCase;
    private readonly sessionService;
    private readonly jwtService;
    constructor(getAdminByIdUseCase: GetAdminByIdUseCase, sessionService: SessionService, jwtService: JwtService);
    execute(adminLoginDto: AdminLoginDto): Promise<{
        admin: import("../../../admins/domain/entities/admin.entity").Admin;
        accessToken: string;
    }>;
}
