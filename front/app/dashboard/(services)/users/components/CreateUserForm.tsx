import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Input, Label } from "@/components/ui";
import { CreateUserDto, createUserSchema } from "@/lib/api/users/user.dto";
import { useCreateUser } from "@/lib/api/users/user.hooks";
import { useAdminStore } from "@/lib/stores/store";

type Props = {
  onClose?: () => void;
};
export function CreateUserForm({ onClose }: Props) {
  const adminId = useAdminStore((state) => state.admin?.id ?? "");
  console.log("adminId", adminId);
  const form = useForm<CreateUserDto>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      adminId: adminId,
    },
  });

  const {
    submit: createUser,
    isPending,
    isError,
  } = useCreateUser({
    adminId,
    onSuccess: onClose,
  });

  function onSubmit(data: CreateUserDto) {
    createUser({ data });
  }

  const emailError = form.formState.errors.email;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          placeholder="user@example.com"
          {...form.register("email")}
        />

        {emailError && (
          <p className="text-sm text-destructive">{emailError.message}</p>
        )}
      </div>

      <div className={"flex gap-3"}>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create user"}
        </Button>
        <Button onClick={onClose}>{"Close"}</Button>
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
