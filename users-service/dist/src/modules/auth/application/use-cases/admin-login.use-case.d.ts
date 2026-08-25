import { JwtService } from "@nestjs/jwt";
import { type AdminRepository } from "../../../admins/domain/interfaces/admin.interface";
import { AdminLoginDto } from "../dto/admin-login.dto";
import { SessionService } from "../../../iam/application/services/session.service";
export declare class AdminLoginUseCase {
    private readonly adminRepository;
    private readonly sessionService;
    private readonly jwtService;
    constructor(adminRepository: AdminRepository, sessionService: SessionService, jwtService: JwtService);
    execute(adminLoginDto: AdminLoginDto): Promise<string>;
}
