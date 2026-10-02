import {
  CreateVehicleDto,
  createVehicleSchema,
  UpdateVehicleDto,
} from "@/lib/api/vehicles/vehicle.dto";
import { ApiResponse } from "@/lib/config/api.interface";
import { vehicleApi } from "@/lib/config/network/api";
import { Vehicle } from "@/lib/entities/vehicle";

const BASE_PREFIX = `/vehicles`;
export class VehicleApi {
  static async getVehicles(): Promise<ApiResponse<Vehicle[]>> {
    const url = BASE_PREFIX;
    const response = await vehicleApi.get<ApiResponse<Vehicle[]>>(url);
    return response.data;
  }

  static async getVehiclesByAdminId(
    adminId: string,
  ): Promise<ApiResponse<Vehicle[]>> {
    const url = BASE_PREFIX + `/admin/${adminId}`;
    const response = await vehicleApi.get<ApiResponse<Vehicle[]>>(url);
    return response.data;
  }

  static async updateVehicle(
    vehicleId: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<ApiResponse<Vehicle>> {
    const url = `${BASE_PREFIX}/${vehicleId}`;
    const response = await vehicleApi.put<ApiResponse<Vehicle>>(
      url,
      updateVehicleDto,
    );
    return response.data;
  }

  static async deleteVehicle(vehicleId: string): Promise<ApiResponse<Vehicle>> {
    const url = `${BASE_PREFIX}/${vehicleId}`;
    const response = await vehicleApi.delete<ApiResponse<Vehicle>>(url);
    return response.data;
  }

  static async createVehicle(
    createVehicleDto: CreateVehicleDto,
  ): Promise<ApiResponse<Vehicle>> {
    const url = `${BASE_PREFIX}/`;
    const response = await vehicleApi.post<ApiResponse<Vehicle>>(
      url,
      createVehicleSchema.parse(createVehicleDto),
    );
    return response.data;
  }

  static async uploadVehiclePhotos(
    vehicleId: string,
    files: FileList,
  ): Promise<ApiResponse<Vehicle>> {
    const url = `${BASE_PREFIX}/${vehicleId}/photos`;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("photos", file);
    });

    const response = await vehicleApi.post<ApiResponse<Vehicle>>(url, formData);
    return response.data;
  }
}
