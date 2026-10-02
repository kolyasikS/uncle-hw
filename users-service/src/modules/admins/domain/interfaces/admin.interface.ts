import { Admin } from "@/modules/admins/domain/entities/admin.entity";

export interface AdminRepository {
  create(admin: Admin): Promise<Admin>;
  getByEmail(email: string): Promise<Admin | null>;
}
