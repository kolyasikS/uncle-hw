import { Module } from "@nestjs/common";
import { SESSION_STORE } from "@/domain/constants";
import { AdminModule } from "@/modules/admins/domain/admin.module";
import { AdminLoginUseCase } from "@/modules/auth/application/use-cases/admin-login.use-case";
import { AuthController } from "@/modules/auth/presentation/auth.controller";
import { SessionService } from "@/modules/iam/application/services/session.service";
import { IamModule } from "@/modules/iam/domain/iam.module";
import { RedisSessionRepository } from "@/modules/iam/infrastructure/repositories/redis-session.repository";

@Module({
  imports: [AdminModule, IamModule],
  controllers: [AuthController],
  providers: [
    AdminLoginUseCase,
    SessionService,
    {
      provide: SESSION_STORE,
      useClass: RedisSessionRepository,
    },
  ],
})
export class AuthModule {}
