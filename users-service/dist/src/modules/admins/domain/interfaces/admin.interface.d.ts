import { Admin } from "../entities/admin.entity";
export interface AdminRepository {
    getByEmail(email: string): Promise<Admin | null>;
}
