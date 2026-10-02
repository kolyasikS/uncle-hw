import { Admin } from "../entities/admin.entity";
export interface AdminRepository {
    create(admin: Admin): Promise<Admin>;
    getByEmail(email: string): Promise<Admin | null>;
}
