import { Admin } from "@/modules/admins/domain/entities/admin.entity";

export interface AdminRepository {
  getByEmail(email: string): Promise<Admin | null>;
}
