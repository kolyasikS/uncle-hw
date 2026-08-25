import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { SessionGuard } from "./session.guard";
export declare class AuthGuard implements CanActivate {
    private readonly jwtGuard;
    private readonly sessionGuard;
    constructor(jwtGuard: JwtAuthGuard, sessionGuard: SessionGuard);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
