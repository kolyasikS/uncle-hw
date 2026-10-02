"use client";

import { useState } from "react";
import { FlipSlide } from "@/app/(auth)/sign-up/components/FlipSlide";
import { ConfirmCodeSlide } from "@/app/(auth)/sign-up/components/slides/ConfirmCodeSlide";
import { SendCodeSlide } from "@/app/(auth)/sign-up/components/slides/SendCodeSlide";
import { SetPasswordSlide } from "@/app/(auth)/sign-up/components/slides/SetPasswordSlide";
import { ThanksSlide } from "@/app/(auth)/sign-up/components/slides/ThanksSlide";
import { SlideProps, TurnSlide } from "@/app/(auth)/sign-up/types";
import { cn } from "@/lib/utils";
import { type AdminSignUpData } from "../types";

const PAGES = [SendCodeSlide, ConfirmCodeSlide, SetPasswordSlide, ThanksSlide];
const STEP_LABELS = ["Send Code", "Confirm Code", "Set Password", "Finish"];
const PAGE_COUNT = 4;
const INITIAL_STATE = {
  email: "",
  code: "",
  password: "",
};

export function SignUpForm() {
  const [data, setData] = useState<AdminSignUpData>(INITIAL_STATE);

  const [current, setCurrent] = useState(0);
  const [turn, setTurn] = useState<TurnSlide | null>(null);

  const update: SlideProps["update"] = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  function startTurn(target: number, resetOnLand = false) {
    console.log("startTurn", turn, target, current, PAGE_COUNT);
    if (turn || target === current || target < 0 || target >= PAGE_COUNT) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (resetOnLand) {
        setData(INITIAL_STATE);
      }
      setCurrent(target);
      return;
    }
    console.log("setTurn");
    setTurn({ from: current, to: target, resetOnLand });
  }

  function finishTurn() {
    console.log("finishTurn");
    if (!turn) {
      return;
    }
    if (turn.resetOnLand) {
      setData(INITIAL_STATE);
    }
    setCurrent(turn.to);
    setTurn(null);
  }

  const pageProps: SlideProps = {
    data,
    update,
    goTo: (page) => startTurn(page),
    restart: () => startTurn(0, true),
  };

  const activeStep = turn ? turn.to : current;

  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <nav aria-label="Form progress">
        <ol className="flex items-center gap-1 text-xs font-medium">
          {STEP_LABELS.map((label, index) => {
            const done = index < activeStep;
            const active = index === activeStep;
            return (
              <li key={label} className="flex flex-1 flex-col gap-2">
                <span
                  className={cn(
                    "h-1 rounded-full transition-colors duration-500",
                    done || active ? "bg-primary" : "bg-foreground/15",
                  )}
                />
                <span
                  aria-current={active ? "step" : undefined}
                  className={cn(
                    "transition-colors duration-500",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>

      <div aria-live="polite" className="sr-only">
        {activeStep === PAGE_COUNT - 1
          ? "Registered Successfully"
          : `Page ${activeStep + 1} of ${STEP_LABELS.length}: ${STEP_LABELS[activeStep]}`}
      </div>

      <FlipSlide
        current={current}
        pageCount={PAGE_COUNT}
        turn={turn}
        onTurnEnd={finishTurn}
        renderPage={(index) => {
          const Page = PAGES[index];
          return <Page {...pageProps} />;
        }}
      />
    </div>
  );
}
