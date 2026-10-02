"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SlideWrapper from "@/app/(auth)/sign-up/components/SlideWrapper";
import { SlideProps } from "@/app/(auth)/sign-up/types";
import {
  Button,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
} from "@/components/ui";
import {
  AdminSendRegistrationEmailDto,
  adminSendRegistrationEmailSchema,
} from "@/lib/api/auth/auth.dto";
import { useAdminSendRegistrationEmail } from "@/lib/api/auth/auth.hooks";

type Props = SlideProps & {
  className?: string;
};
export function SendCodeSlide({
  update,
  goTo,
  restart,
  data,
  className,
}: Props) {
  const form = useForm<AdminSendRegistrationEmailDto>({
    resolver: zodResolver(adminSendRegistrationEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const { submit: adminSendRegistrationEmail, isPending } =
    useAdminSendRegistrationEmail({
      onSuccess: () => {},
    });

  async function onSubmit(data: AdminSendRegistrationEmailDto) {
    try {
      await adminSendRegistrationEmail({ data });
      update("email", data.email);
      goTo(1);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <SlideWrapper
      title={"Sign up"}
      description={"Enter your email below to get a code for registration"}
      onSubmit={form.handleSubmit(onSubmit)}
      className={"h-full"}
    >
      <FieldGroup className={"flex flex-col justify-between h-full pb-5"}>
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
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Sending code..." : "Send code"}
            </Button>
          </Field>
          <FieldDescription className="text-center">
            Already have an account? <a href="/sign-in">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </SlideWrapper>
  );
}
