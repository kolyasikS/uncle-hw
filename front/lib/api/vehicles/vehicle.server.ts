import { QueryClient } from "@tanstack/react-query";
import { VehicleApi } from "@/lib/api/vehicles/vehicle.api";

export const prefetchVehicles = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: ["vehicles"],
    queryFn: VehicleApi.getVehicles,
  });

  return queryClient;
};
