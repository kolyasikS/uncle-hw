import { type AdminRepository } from "../../domain/interfaces/admin.interface";
import { AdminLoginDto } from "../../../auth/application/dto/admin-login.dto";
export declare class GetAdminByIdUseCase {
    private readonly adminRepository;
    constructor(adminRepository: AdminRepository);
    execute(dto: AdminLoginDto): Promise<import("../../domain/entities/admin.entity").Admin>;
}
