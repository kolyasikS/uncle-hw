import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { type Response } from "express";
import { ApiResponse, type ApiResponseType } from "@/domain/api-response";
import { AUTH_COOKIE_NAME, NODE_ENV, ROLES } from "@/domain/constants";
import {
  loginMessages,
  tokenVerificationMessages,
} from "@/domain/messages/auth.messages";
import { AdminLoginDto } from "@/modules/auth/application/dto/admin-login.dto";
import { AdminLoginUseCase } from "@/modules/auth/application/use-cases/admin-login.use-case";
import { Session } from "@/modules/iam/domain/decorators/auth.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly adminLoginUseCase: AdminLoginUseCase) {}

  @Post("/admin/login")
  async adminLogin(
    @Body() adminLoginDto: AdminLoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponseType<boolean>> {
    const accessToken = await this.adminLoginUseCase.execute(adminLoginDto);

    res.cookie(AUTH_COOKIE_NAME, accessToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    return ApiResponse.success({
      data: true,
      message: loginMessages.success,
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
}
