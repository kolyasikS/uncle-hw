import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "@/components/ui";
import { UserApi } from "@/lib/api/users/user.api";
import { CreateUserDto, UpdateUserDto } from "@/lib/api/users/user.dto";
import { USERS_QK } from "@/lib/api/users/user.query-keys";
import { VEHICLES_QK } from "@/lib/api/vehicles/vehicle.query-keys";
import { STALE_TIME } from "@/lib/constants";

export const useUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: [USERS_QK],
    queryFn: UserApi.getUsers,
    placeholderData: keepPreviousData,
    staleTime: STALE_TIME.SHORT,
  });

  return { response: data, isLoading: isLoading };
};

type UseCreateUserProps = {
  adminId: string;
  onSuccess?: () => void;
};
export function useCreateUser({ onSuccess, adminId }: UseCreateUserProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ data }: { data: CreateUserDto }) => UserApi.createUser(data),

    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
      toast.success("User created successfully");

      queryClient.invalidateQueries({
        queryKey: [USERS_QK],
      });
      queryClient.invalidateQueries({
        queryKey: [adminId, VEHICLES_QK],
      });
    },

    onError: () => {
      toast.error("Failed to create user");
    },
  });

  return {
    submit: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
}

type UseUpdateUserProps = {
  onSuccess?: () => void;
};
export function useUpdateUser({ onSuccess }: UseUpdateUserProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UpdateUserDto }) =>
      UserApi.updateUser(userId, data),

    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
      toast.success("User updated successfully");

      queryClient.invalidateQueries({
        queryKey: [USERS_QK],
      });
    },

    onError: () => {
      toast.error("Failed to update user");
    },
  });

  return {
    submit: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
}

type UseDeleteUserProps = {
  onSuccess?: () => void;
};
export function useDeleteUser({ onSuccess }: UseDeleteUserProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ userId }: { userId: string }) => UserApi.deleteUser(userId),

    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
      toast.success("User deleted successfully");

      queryClient.invalidateQueries({
        queryKey: [USERS_QK],
      });
    },

    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  return {
    submit: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
}
