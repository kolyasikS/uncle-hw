import { Module } from "@nestjs/common";
import { SESSION_STORE } from "@/domain/constants";
import { SessionService } from "@/modules/iam/application/services/session.service";
import { AuthGuard } from "@/modules/iam/domain/guards/auth.guard";
import { JwtAuthGuard } from "@/modules/iam/domain/guards/jwt-auth.guard";
import { SessionGuard } from "@/modules/iam/domain/guards/session.guard";
import { RedisSessionRepository } from "@/modules/iam/infrastructure/repositories/redis-session.repository";

@Module({
  providers: [
    JwtAuthGuard,
    SessionGuard,
    AuthGuard,
    SessionService,
    {
      provide: SESSION_STORE,
      useClass: RedisSessionRepository,
    },
  ],
  exports: [AuthGuard, JwtAuthGuard, SessionGuard],
})
export class IamModule {}
