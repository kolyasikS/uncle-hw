import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Input, Label } from "@/components/ui";
import { UpdateUserDto, updateUserSchema } from "@/lib/api/users/user.dto";
import { useUpdateUser } from "@/lib/api/users/user.hooks";
import { User } from "@/lib/entities/user";

type Props = {
  onClose?: () => void;
  user: User;
};
export function UpdateUserForm({ onClose, user }: Props) {
  const form = useForm<UpdateUserDto>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: user.email,
    },
  });

  const {
    submit: updateUser,
    isPending,
    isError,
  } = useUpdateUser({
    onSuccess: onClose,
  });

  function onSubmit(data: UpdateUserDto) {
    updateUser({ userId: user.id, data });
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
          {isPending ? "Updating..." : "Update user"}
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
