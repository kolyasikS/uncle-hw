import { Otp } from "@/modules/otp/domain/entities/otp.entity";

export interface OtpRepository {
  create(user: Otp): Promise<Otp>;
  getByEmail(email: string): Promise<Otp | null>;
}
