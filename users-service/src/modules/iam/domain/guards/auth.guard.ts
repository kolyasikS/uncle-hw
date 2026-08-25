import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtAuthGuard } from "@/modules/iam/domain/guards/jwt-auth.guard";
import { SessionGuard } from "@/modules/iam/domain/guards/session.guard";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtGuard: JwtAuthGuard,
    private readonly sessionGuard: SessionGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const jwtValid = await this.jwtGuard.canActivate(context);

    if (!jwtValid) {
      return false;
    }

    return this.sessionGuard.canActivate(context);
  }
}
