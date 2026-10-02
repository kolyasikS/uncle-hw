import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "@/components/ui";
import { VehicleApi } from "@/lib/api/vehicles/vehicle.api";
import {
  CreateVehicleDto,
  UpdateVehicleDto,
} from "@/lib/api/vehicles/vehicle.dto";
import { VEHICLES_QK } from "@/lib/api/vehicles/vehicle.query-keys";
import { STALE_TIME } from "@/lib/constants";
import { Vehicle } from "@/lib/entities/vehicle";

export const useVehicles = () => {
  const { data, isLoading } = useQuery({
    queryKey: [VEHICLES_QK],
    queryFn: VehicleApi.getVehicles,
    placeholderData: keepPreviousData,
    staleTime: STALE_TIME.SHORT,
  });

  return { response: data, isLoading: isLoading };
};

export const useAdminVehicles = (adminId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [adminId, VEHICLES_QK],
    queryFn: () => VehicleApi.getVehiclesByAdminId(adminId),
    placeholderData: keepPreviousData,
    staleTime: STALE_TIME.SHORT,
    enabled: !!adminId,
  });

  return { response: data, isLoading: isLoading };
};

type useUpdateVehicleProps = {
  adminId: string;
  onSuccess?: () => void;
};
export function useUpdateVehicle({
  onSuccess,
  adminId,
}: useUpdateVehicleProps) {
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
        queryKey: [adminId, VEHICLES_QK],
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
  adminId: string;
  onSuccess?: () => void;
};
export function useDeleteVehicle({
  onSuccess,
  adminId,
}: useDeleteVehicleProps) {
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
        queryKey: [adminId, VEHICLES_QK],
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

type UseCreateVehicleProps = {
  adminId: string;
  onSuccess?: () => void;
};
export function useCreateVehicle({
  onSuccess,
  adminId,
}: UseCreateVehicleProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ data }: { data: CreateVehicleDto }) =>
      VehicleApi.createVehicle(data),

    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
      toast.success("Vehicle created successfully");

      queryClient.invalidateQueries({
        queryKey: [adminId, VEHICLES_QK],
      });
    },

    onError: () => {
      toast.error("Failed to create vehicle");
    },
  });

  return {
    submit: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
}

type useUploadVehiclePhotosProps = {
  adminId: string;
  onSuccess?: (vehicle: Vehicle) => void;
};
export function useUploadVehiclePhotos({
  onSuccess,
  adminId,
}: useUploadVehiclePhotosProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ vehicleId, data }: { vehicleId: string; data: FileList }) =>
      VehicleApi.uploadVehiclePhotos(vehicleId, data),

    onSuccess: (response) => {
      if (onSuccess) {
        onSuccess(response.data);
      }
      toast.success("Photos uploaded successfully");

      queryClient.invalidateQueries({
        queryKey: [adminId, VEHICLES_QK],
      });
    },

    onError: () => {
      toast.error("Failed to upload photos");
    },
  });

  return {
    submit: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
}
