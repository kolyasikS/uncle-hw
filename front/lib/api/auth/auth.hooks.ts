import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui";
import { AuthApi } from "@/lib/api/auth/auth.api";
import { AdminLoginDto } from "@/lib/api/auth/auth.dto";
import { retrieveErrorMessage } from "@/lib/utils";

type UseAdminLoginProps = {
  onSuccess?: () => void;
};
export function useAdminLogin({ onSuccess }: UseAdminLoginProps) {
  const mutation = useMutation({
    mutationFn: ({ data }: { data: AdminLoginDto }) => AuthApi.adminLogin(data),

    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
      toast.success("Admin logged in successfully");
    },

    onError: (error) => {
      console.log(error);
      toast.error(retrieveErrorMessage(error) ?? "Failed to login");
    },
  });

  return {
    submit: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
}
