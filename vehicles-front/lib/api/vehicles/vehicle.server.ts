import { VehicleApi } from "@/lib/api/vehicles/vehicle.api";
import { createQueryClient } from "@/lib/config/network/ts-query";

export const prefetchVehicles = async () => {
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["vehicles"],
    queryFn: VehicleApi.getVehicles,
  });

  return queryClient;
};
