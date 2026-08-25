import { Role } from "@/domain/constants";

export interface JwtPayload {
  sub: string;
  sid: string;
  role: Role;
}
