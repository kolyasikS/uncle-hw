"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
} from "@/components/ui";
import { AdminLoginDto, adminLoginSchema } from "@/lib/api/auth/auth.dto";
import { useAdminLogin } from "@/lib/api/auth/auth.hooks";
import { Admin } from "@/lib/entities/admin";
import { useAdminStore } from "@/lib/stores/store";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const setAdmin = useAdminStore((state) => state.setAdmin);
  const form = useForm<AdminLoginDto>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "qweqwe1!",
    },
  });

  const { submit: adminLogin, isPending } = useAdminLogin({
    onSuccess: (admin: Admin) => {
      router.push("/dashboard");
      setAdmin(admin);
    },
  });

  function onSubmit(data: AdminLoginDto) {
    adminLogin({ data });
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...form.register("email")}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...form.register("password")}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Logging in..." : "Login"}
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="/sign-up">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
