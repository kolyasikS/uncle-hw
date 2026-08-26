import { CreateUserDto, UpdateUserDto } from "@/lib/api/users/user.dto";
import { ApiResponse } from "@/lib/config/api.interface";
import { userApi } from "@/lib/config/network/api";
import { User } from "@/lib/entities/user";

const BASE_PREFIX = `/users`;
export class UserApi {
  static async getUsers(): Promise<ApiResponse<User[]>> {
    const url = BASE_PREFIX;
    const response = await userApi.get<ApiResponse<User[]>>(url);
    return response.data;
  }

  static async createUser(
    createUserDto: CreateUserDto,
  ): Promise<ApiResponse<User>> {
    const url = BASE_PREFIX;
    const response = await userApi.post<ApiResponse<User>>(url, createUserDto);
    return response.data;
  }

  static async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<User>> {
    const url = `${BASE_PREFIX}/${userId}`;
    const response = await userApi.put<ApiResponse<User>>(url, updateUserDto);
    return response.data;
  }

  static async deleteUser(userId: string): Promise<ApiResponse<User>> {
    const url = `${BASE_PREFIX}/${userId}`;
    const response = await userApi.delete<ApiResponse<User>>(url);
    return response.data;
  }
}
