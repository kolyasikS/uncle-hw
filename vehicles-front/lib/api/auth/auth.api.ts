import { AdminLoginDto } from "@/lib/api/auth/auth.dto";
import { ApiResponse } from "@/lib/config/api.interface";
import { userApi } from "@/lib/config/network/api";

const BASE_PREFIX = "/auth";
export class AuthApi {
  static async adminLogin(
    adminLoginDto: AdminLoginDto,
  ): Promise<ApiResponse<boolean>> {
    const url = `${BASE_PREFIX}/admin/login`;
    const response = await userApi.post<ApiResponse<boolean>>(
      url,
      adminLoginDto,
    );
    return response.data;
  }
}
