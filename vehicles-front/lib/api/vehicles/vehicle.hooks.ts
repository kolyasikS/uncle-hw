import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui";
import { VehicleApi } from "@/lib/api/vehicles/vehicle.api";
import { UpdateVehicleDto } from "@/lib/api/vehicles/vehicle.dto";
import { VEHICLES_QK } from "@/lib/api/vehicles/vehicle.query-keys";

export const useVehicles = () => {
  const { data, isLoading } = useQuery({
    queryKey: [VEHICLES_QK],
    queryFn: VehicleApi.getVehicles,
  });

  return { response: data, isLoading: isLoading };
};

type useUpdateVehicleProps = {
  onSuccess?: () => void;
};
export function useUpdateVehicle({ onSuccess }: useUpdateVehicleProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      vehicleId,
      data,
    }: {
      vehicleId: string;
      data: UpdateVehicleDto;
    }) => VehicleApi.updateVehicle(vehicleId, data),

    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
      toast.success("Vehicle updated successfully");

      queryClient.invalidateQueries({
        queryKey: [VEHICLES_QK],
      });
    },

    onError: () => {
      toast.error("Failed to update vehicle");
    },
  });

  return {
    submit: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
}

type useDeleteVehicleProps = {
  onSuccess?: () => void;
};
export function useDeleteVehicle({ onSuccess }: useDeleteVehicleProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ vehicleId }: { vehicleId: string }) =>
      VehicleApi.deleteVehicle(vehicleId),

    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
      toast.success("Vehicle deleted successfully");

      queryClient.invalidateQueries({
        queryKey: [VEHICLES_QK],
      });
    },

    onError: () => {
      toast.error("Failed to delete vehicle");
    },
  });

  return {
    submit: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
}
