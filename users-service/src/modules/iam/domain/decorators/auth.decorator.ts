import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { Role, SESSION_ROLE_KEY } from "@/domain/constants";
import { AuthGuard } from "@/modules/iam/domain/guards/auth.guard";

export function Session(role: Role) {
  return applyDecorators(
    SetMetadata(SESSION_ROLE_KEY, role),
    UseGuards(AuthGuard),
  );
}
