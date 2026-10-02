import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { type Response } from "express";
import { ApiResponse, type ApiResponseType } from "@/domain/api-response";
import { AUTH_COOKIE_NAME, NODE_ENV, ROLES } from "@/domain/constants";
import { signUpAdminMessages } from "@/domain/messages/admin.messages";
import {
  loginMessages,
  sendEmailMessages,
  tokenVerificationMessages,
} from "@/domain/messages/auth.messages";
import { otpVerificationMessages } from "@/domain/messages/otp.messages";
import {
  Admin,
  AdminHttp,
} from "@/modules/admins/domain/entities/admin.entity";
import { AdminMapper } from "@/modules/admins/infrastructure/mappers/admin.mapper";
import { AdminConfirmCodeDto } from "@/modules/auth/application/dto/admin-confirm-code.dto";
import { AdminLoginDto } from "@/modules/auth/application/dto/admin-login.dto";
import { AdminSignUpDto } from "@/modules/auth/application/dto/admin-signup.dto";
import { AdminConfirmCodeUseCase } from "@/modules/auth/application/use-cases/admin-confirm-code.use-case";
import { AdminLoginUseCase } from "@/modules/auth/application/use-cases/admin-login.use-case";
import { AdminSendRegistrationCodeUseCase } from "@/modules/auth/application/use-cases/admin-send-registration-code.use-case";
import { AdminSignUpUseCase } from "@/modules/auth/application/use-cases/admin-signup.use-case";
import { Session } from "@/modules/iam/domain/decorators/auth.decorator";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly adminLoginUseCase: AdminLoginUseCase,
    private readonly adminSignUpUseCase: AdminSignUpUseCase,
    private readonly adminSendEmailUseCase: AdminSendRegistrationCodeUseCase,
    private readonly adminConfirmCodeUseCase: AdminConfirmCodeUseCase,
  ) {}

  @Post("/admin/login")
  async adminLogin(
    @Body() adminLoginDto: AdminLoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponseType<Admin>> {
    const { admin, accessToken } =
      await this.adminLoginUseCase.execute(adminLoginDto);

    res.cookie(AUTH_COOKIE_NAME, accessToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    return ApiResponse.success({
      data: admin,
      message: loginMessages.success,
      statusCode: HttpStatus.OK,
    });
  }

  @Post("/admin/emails")
  async adminSendCodeRegistrationEmail(
    @Body() adminSendEmailDto: AdminLoginDto,
  ): Promise<ApiResponseType<boolean>> {
    await this.adminSendEmailUseCase.execute(adminSendEmailDto);

    return ApiResponse.success({
      data: true,
      message: sendEmailMessages.success,
      statusCode: HttpStatus.OK,
    });
  }

  @Post("/admin/codes/verify")
  async adminConfirmRegistrationCode(
    @Body() adminConfirmCodeDto: AdminConfirmCodeDto,
  ): Promise<ApiResponseType<boolean>> {
    await this.adminConfirmCodeUseCase.execute(adminConfirmCodeDto);

    return ApiResponse.success({
      data: true,
      message: otpVerificationMessages.success,
      statusCode: HttpStatus.OK,
    });
  }

  @Session(ROLES.ADMIN)
  @Post("/verify")
  async verify(): Promise<ApiResponseType<boolean>> {
    return ApiResponse.success({
      data: true,
      message: tokenVerificationMessages.success,
      statusCode: HttpStatus.OK,
    });
  }

  @Post("/admin/sign-up")
  async adminSignUp(
    @Body() adminSignUpDto: AdminSignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponseType<AdminHttp>> {
    const { admin, accessToken } =
      await this.adminSignUpUseCase.execute(adminSignUpDto);

    res.cookie(AUTH_COOKIE_NAME, accessToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    return ApiResponse.success({
      data: AdminMapper.toHttp(admin),
      message: signUpAdminMessages.success,
      statusCode: HttpStatus.OK,
    });
  }
}
