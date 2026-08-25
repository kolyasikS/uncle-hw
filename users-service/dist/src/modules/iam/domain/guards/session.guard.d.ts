import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { SessionService } from "../../application/services/session.service";
export declare class SessionGuard implements CanActivate {
    private readonly sessionService;
    private readonly reflector;
    constructor(sessionService: SessionService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
