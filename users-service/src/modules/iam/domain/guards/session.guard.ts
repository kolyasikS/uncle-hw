import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import {
  JWT_PAYLOAD,
  Role,
  SESSION_KEYS,
  SESSION_ROLE_KEY,
} from "@/domain/constants";
import { JwtPayload } from "@/modules/auth/domain/interfaces/jwt.interface";
import { SessionService } from "@/modules/iam/application/services/session.service";

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    private readonly sessionService: SessionService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.getAllAndOverride<Role>(SESSION_ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    const payload = request[JWT_PAYLOAD] as JwtPayload;

    if (!payload?.sid) {
      throw new UnauthorizedException();
    }

    const session = await this.sessionService.get(
      SESSION_KEYS[role],
      payload.sid,
    );

    if (!session) {
      throw new UnauthorizedException("Session expired or revoked");
    }

    return true;
  }
}
