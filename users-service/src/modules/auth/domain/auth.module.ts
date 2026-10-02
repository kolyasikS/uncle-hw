import { Module } from "@nestjs/common";
import { SESSION_STORE } from "@/domain/constants";
import { AdminModule } from "@/modules/admins/domain/admin.module";
import { AdminConfirmCodeUseCase } from "@/modules/auth/application/use-cases/admin-confirm-code.use-case";
import { AdminLoginUseCase } from "@/modules/auth/application/use-cases/admin-login.use-case";
import { AdminSendRegistrationCodeUseCase } from "@/modules/auth/application/use-cases/admin-send-registration-code.use-case";
import { AdminSignUpUseCase } from "@/modules/auth/application/use-cases/admin-signup.use-case";
import { AuthController } from "@/modules/auth/presentation/auth.controller";
import { SessionService } from "@/modules/iam/application/services/session.service";
import { IamModule } from "@/modules/iam/domain/iam.module";
import { RedisSessionRepository } from "@/modules/iam/infrastructure/repositories/redis-session.repository";
import { MailModule } from "@/modules/mail/domain/mail.module";
import { OtpModule } from "@/modules/otp/domain/otp.module";

@Module({
  imports: [AdminModule, IamModule, MailModule, OtpModule],
  controllers: [AuthController],
  providers: [
    AdminLoginUseCase,
    AdminSendRegistrationCodeUseCase,
    AdminConfirmCodeUseCase,
    AdminSignUpUseCase,
    SessionService,
    {
      provide: SESSION_STORE,
      useClass: RedisSessionRepository,
    },
  ],
})
export class AuthModule {}
