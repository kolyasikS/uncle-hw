import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ADMIN_SESSION_KEY, ROLES } from "@/domain/constants";
import { InvalidCredentialsException } from "@/domain/exceptions/domain.exceptions";
import { GetAdminByIdUseCase } from "@/modules/admins/application/use-cases/get-admin-by-id.use-case";
import { checkPassword } from "@/modules/admins/application/utils";
import { AdminLoginDto } from "@/modules/auth/application/dto/admin-login.dto";
import { SessionService } from "@/modules/iam/application/services/session.service";

@Injectable()
export class AdminLoginUseCase {
  constructor(
    private readonly getAdminByIdUseCase: GetAdminByIdUseCase,
    private readonly sessionService: SessionService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(adminLoginDto: AdminLoginDto) {
    const admin = await this.getAdminByIdUseCase.execute({
      email: adminLoginDto.email,
    });

    if (!admin) {
      throw new InvalidCredentialsException();
    }

    const passwordValid = await checkPassword(
      admin.password,
      adminLoginDto.password,
    );

    if (!passwordValid) {
      throw new InvalidCredentialsException();
    }

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
