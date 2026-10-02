"use client";

import Link from "next/link";
import SlideWrapper from "@/app/(auth)/sign-up/components/SlideWrapper";
import { SlideProps } from "@/app/(auth)/sign-up/types";
import { Button, Field, FieldGroup } from "@/components/ui";

type Props = SlideProps & {
  className?: string;
};
export function ThanksSlide({ update, goTo, restart, data, className }: Props) {
  return (
    <SlideWrapper
      title={"Rehistration Completed"}
      description={"Thank you for the registration. Welcome to our community!"}
      className={"h-full"}
    >
      <FieldGroup className={"flex flex-col justify-end h-full pb-5"}>
        <Field>
          <Field className={"w-full"}>
            <Link href={"/dashboard"}>
              <Button className={"w-full"}>Go to Dashboard</Button>
            </Link>
          </Field>
        </Field>
      </FieldGroup>
    </SlideWrapper>
  );
}
