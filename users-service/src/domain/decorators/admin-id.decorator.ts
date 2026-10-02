// decorators/admin-id.decorator.ts
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

export const AdminId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();

    const adminId = request.adminId;
    console.log(request.adminId);
    if (!adminId) {
      throw new UnauthorizedException("Admin ID not found in session context");
    }

    return adminId;
  },
);
