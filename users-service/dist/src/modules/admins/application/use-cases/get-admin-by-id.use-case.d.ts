import { GetAdminDto } from "../dto/get-admin.dto";
import { type AdminRepository } from "../../domain/interfaces/admin.interface";
export declare class GetAdminByIdUseCase {
    private readonly adminRepository;
    constructor(adminRepository: AdminRepository);
    execute(dto: GetAdminDto): Promise<import("../../domain/entities/admin.entity").Admin>;
}
