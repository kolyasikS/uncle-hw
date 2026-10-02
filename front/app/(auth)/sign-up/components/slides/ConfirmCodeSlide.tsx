"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import SlideWrapper from "@/app/(auth)/sign-up/components/SlideWrapper";
import { SlideProps } from "@/app/(auth)/sign-up/types";
import {
  Button,
  Field,
  FieldGroup,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui";
import {
  AdminConfirmRegistrationCodeDto,
  adminConfirmRegistrationCodeSchema,
} from "@/lib/api/auth/auth.dto";
import { useAdminConfirmRegistrationCode } from "@/lib/api/auth/auth.hooks";

type Props = SlideProps & {
  className?: string;
};
export function ConfirmCodeSlide({
  update,
  goTo,
  restart,
  data,
  className,
}: Props) {
  const form = useForm<AdminConfirmRegistrationCodeDto>({
    resolver: zodResolver(adminConfirmRegistrationCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const { submit: adminConfirmRegistrationCode, isPending } =
    useAdminConfirmRegistrationCode({});

  async function onSubmit(data: AdminConfirmRegistrationCodeDto) {
    try {
      await adminConfirmRegistrationCode({ data });
      goTo(2);
    } catch (e) {
      console.error(e);
    }
  }

  function onBack() {
    goTo(0);
  }

  return (
    <SlideWrapper
      title={"Code Confirmation"}
      description={"Enter code sent on your email"}
      onSubmit={form.handleSubmit(onSubmit)}
      className={"h-full"}
    >
      <FieldGroup className={"flex flex-col justify-between h-full pb-5"}>
        <Field>
          <Controller
            control={form.control}
            name="code"
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                id="otp-verification"
                value={field.value}
                onChange={(val) => field.onChange(val)}
                containerClassName={"flex justify-center w-full"}
              >
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator className="mx-2" />
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
        </Field>
        <Field className={"flex-row justify-between"}>
          <Field className={"sm:w-1/4"}>
            <Button onClick={onBack} variant={"secondary"} disabled={isPending}>
              Back
            </Button>
          </Field>
          <Field className={"sm:w-2/4"}>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Verifying code..." : "Verify code"}
            </Button>
          </Field>
        </Field>
      </FieldGroup>
    </SlideWrapper>
  );
}
