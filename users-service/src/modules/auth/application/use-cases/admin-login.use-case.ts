import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ADMIN_REPOSITORY, ADMIN_SESSION_KEY, ROLES } from "@/domain/constants";
import { InvalidCredentialsException } from "@/domain/exceptions/domain.exceptions";
import { checkPassword } from "@/modules/admins/application/utils";
import { type AdminRepository } from "@/modules/admins/domain/interfaces/admin.interface";
import { AdminLoginDto } from "@/modules/auth/application/dto/admin-login.dto";
import { SessionService } from "@/modules/iam/application/services/session.service";

@Injectable()
export class AdminLoginUseCase {
  constructor(
    @Inject(ADMIN_REPOSITORY)
    private readonly adminRepository: AdminRepository,
    private readonly sessionService: SessionService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(adminLoginDto: AdminLoginDto) {
    const admin = await this.adminRepository.getByEmail(adminLoginDto.email);

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

    return accessToken;
  }
}
