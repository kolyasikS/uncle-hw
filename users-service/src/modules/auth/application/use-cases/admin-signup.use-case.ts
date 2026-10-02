import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ADMIN_SESSION_KEY, ROLES } from "@/domain/constants";
import { CreateAdminUseCase } from "@/modules/admins/application/use-cases/create-admin.use-case";
import { AdminSignUpDto } from "@/modules/auth/application/dto/admin-signup.dto";
import { SessionService } from "@/modules/iam/application/services/session.service";

@Injectable()
export class AdminSignUpUseCase {
  constructor(
    private readonly createAdminUseCase: CreateAdminUseCase,
    private readonly sessionService: SessionService,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ email, password }: AdminSignUpDto) {
    const admin = await this.createAdminUseCase.execute({ email, password });

    // 1. Create server-side session
    const sessionId = await this.sessionService.create(
      ADMIN_SESSION_KEY,
      admin.id,
    );

    // 2. Create short-lived JWT
    const accessToken = await this.jwtService.signAsync({
      sub: admin.id,
      sid: sessionId,
      role: ROLES.ADMIN,
    });

    return { admin, accessToken };
  }
}
