import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui";
import { AuthApi } from "@/lib/api/auth/auth.api";
import {
  AdminConfirmRegistrationCodeDto,
  AdminLoginDto,
  AdminSendRegistrationEmailDto,
  AdminSignUpDto,
} from "@/lib/api/auth/auth.dto";
import { Admin } from "@/lib/entities/admin";
import { retrieveErrorMessage } from "@/lib/utils";

type UseAdminLoginProps = {
  onSuccess?: (admin: Admin) => void;
};
export function useAdminLogin({ onSuccess }: UseAdminLoginProps) {
  const mutation = useMutation({
    mutationFn: ({ data }: { data: AdminLoginDto }) => AuthApi.adminLogin(data),

    onSuccess: (response) => {
      if (onSuccess) {
        onSuccess(response.data);
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

type UseAdminSendRegistrationEmailProps = {
  onSuccess?: () => void;
};
export function useAdminSendRegistrationEmail({
  onSuccess,
}: UseAdminSendRegistrationEmailProps) {
  const mutation = useMutation({
    mutationFn: async ({ data }: { data: AdminSendRegistrationEmailDto }) =>
      AuthApi.adminSendRegistrationCode(data),

    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
      toast.success("Code is sent successfully");
    },

    onError: (error) => {
      console.log(error);
      toast.error(retrieveErrorMessage(error) ?? "Failed to send code");
    },
  });

  return {
    submit: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
}

type UseAdmiConfirmRegistrationCodeProps = {
  onSuccess?: () => void;
};
export function useAdminConfirmRegistrationCode({
  onSuccess,
}: UseAdmiConfirmRegistrationCodeProps) {
  const mutation = useMutation({
    mutationFn: async ({ data }: { data: AdminConfirmRegistrationCodeDto }) =>
      AuthApi.adminConfirmRegistrationCode(data),

    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
      toast.success("Code is verified successfully");
    },

    onError: (error) => {
      console.log(error);
      toast.error(retrieveErrorMessage(error) ?? "Failed to verify code");
    },
  });

  return {
    submit: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
}

type UseAdminSignUpProps = {
  onSuccess?: (data: Admin) => void;
};
export function useAdminSignUp({ onSuccess }: UseAdminSignUpProps) {
  const mutation = useMutation({
    mutationFn: async ({ data }: { data: AdminSignUpDto }) =>
      AuthApi.adminSignUp(data),

    onSuccess: (response) => {
      if (onSuccess) {
        onSuccess(response.data);
      }
      toast.success("You registered successfully");
    },

    onError: (error) => {
      console.log(error);
      toast.error(retrieveErrorMessage(error) ?? "Failed to register");
    },
  });

  return {
    submit: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
}
