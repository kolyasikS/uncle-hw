import {
  AdminConfirmRegistrationCodeDto,
  AdminLoginDto,
  AdminSendRegistrationEmailDto,
  AdminSignUpDto,
} from "@/lib/api/auth/auth.dto";
import { ApiResponse } from "@/lib/config/api.interface";
import { userApi } from "@/lib/config/network/api";
import { Admin } from "@/lib/entities/admin";

const BASE_PREFIX = "/auth";
export class AuthApi {
  static async adminLogin(
    adminLoginDto: AdminLoginDto,
  ): Promise<ApiResponse<Admin>> {
    const url = `${BASE_PREFIX}/admin/login`;
    const response = await userApi.post<ApiResponse<Admin>>(url, adminLoginDto);
    return response.data;
  }

  static async adminSendRegistrationCode(
    adminSendRegistrationEmailDto: AdminSendRegistrationEmailDto,
  ): Promise<ApiResponse<boolean>> {
    const url = `${BASE_PREFIX}/admin/emails`;
    const response = await userApi.post<ApiResponse<boolean>>(
      url,
      adminSendRegistrationEmailDto,
    );
    return response.data;
  }

  static async adminConfirmRegistrationCode(
    adminConfirmRegistrationCodeDto: AdminConfirmRegistrationCodeDto,
  ): Promise<ApiResponse<boolean>> {
    const url = `${BASE_PREFIX}/admin/codes/verify`;
    const response = await userApi.post<ApiResponse<boolean>>(
      url,
      adminConfirmRegistrationCodeDto,
    );
    return response.data;
  }

  static async adminSignUp(
    adminSignUpDto: AdminSignUpDto,
  ): Promise<ApiResponse<Admin>> {
    const url = `${BASE_PREFIX}/admin/sign-up`;
    const response = await userApi.post<ApiResponse<Admin>>(
      url,
      adminSignUpDto,
    );
    return response.data;
  }
}
