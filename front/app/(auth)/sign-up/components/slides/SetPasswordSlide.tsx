"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SlideWrapper from "@/app/(auth)/sign-up/components/SlideWrapper";
import { SlideProps } from "@/app/(auth)/sign-up/types";
import { Button, Field, FieldGroup, FieldLabel, Input } from "@/components/ui";
import { AdminSignUpDto, adminSignUpSchema } from "@/lib/api/auth/auth.dto";
import { useAdminSignUp } from "@/lib/api/auth/auth.hooks";
import { Admin } from "@/lib/entities/admin";
import { useAdminStore } from "@/lib/stores/store";

type Props = SlideProps & {
  className?: string;
};
export function SetPasswordSlide({ goTo, data }: Props) {
  const setAdmin = useAdminStore((state) => state.setAdmin);

  const form = useForm<AdminSignUpDto>({
    resolver: zodResolver(adminSignUpSchema),
    defaultValues: {
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  });

  const { errors } = form.formState;

  const { submit: adminSignUp, isPending } = useAdminSignUp({
    onSuccess: (admin: Admin) => {
      goTo(3);
      setAdmin(admin);
    },
  });

  async function onSubmit(data: AdminSignUpDto) {
    try {
      await adminSignUp({ data });
    } catch (e) {
      console.error(e);
    }
  }

  function onBack() {
    goTo(1);
  }

  return (
    <SlideWrapper
      title={"Sign up"}
      description={"Enter your email below to get a code for registration"}
      onSubmit={form.handleSubmit(onSubmit)}
      className={"h-full"}
    >
      <FieldGroup className={"flex flex-col justify-between h-full pb-5"}>
        <Field className={"flex flex-col gap-5"}>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              required
              {...form.register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm password"
              required
              {...form.register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </Field>
        </Field>
        <Field className={"flex-row justify-between"}>
          <Field className={"sm:w-1/4"}>
            <Button onClick={onBack} variant={"secondary"} disabled={isPending}>
              Back
            </Button>
          </Field>
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Registering..." : "Register"}
            </Button>
          </Field>
        </Field>
      </FieldGroup>
    </SlideWrapper>
  );
}
