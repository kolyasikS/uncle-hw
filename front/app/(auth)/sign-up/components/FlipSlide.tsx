"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { TurnSlide } from "@/app/(auth)/sign-up/types";
import { cn } from "@/lib/utils";

type FlipSlideProps = {
  current: number;
  pageCount: number;
  turn: TurnSlide | null;
  renderPage: (index: number) => ReactNode;
  onTurnEnd: () => void;
};

export function FlipSlide({
  current,
  pageCount,
  turn,
  renderPage,
  onTurnEnd,
}: FlipSlideProps) {
  const bookRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    bookRef.current
      ?.querySelector<HTMLElement>("[data-page-heading]")
      ?.focus({ preventScroll: true });
  }, [current]);

  const forward = turn ? turn.to > turn.from : true;
  const shownPage = turn ? turn.to : current;

  const sheetsBehind = Math.min(pageCount - 1 - shownPage, 3);

  return (
    <div
      ref={bookRef}
      data-direction={forward ? "forward" : "backward"}
      className="relative h-100 w-full md:h-100"
    >
      {Array.from({ length: sheetsBehind }, (_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute inset-0 rounded-l-sm rounded-r-md border border-border bg-card shadow-sm"
          style={{
            transform: `translate(${(sheetsBehind - i) * 4}px, ${(sheetsBehind - i) * 3}px)`,
          }}
        />
      ))}

      <div className="absolute inset-0 overflow-hidden rounded-l-sm rounded-r-md">
        {turn && (
          <div
            key={`out-${turn.from}-${turn.to}`}
            aria-hidden="true"
            inert
            className="slide-out absolute inset-0"
          >
            <Paper>{renderPage(turn.from)}</Paper>
          </div>
        )}

        <div
          key={`page-${shownPage}`}
          inert={turn !== null}
          className={cn("absolute inset-0", turn && "slide-in")}
          onAnimationEnd={(event) => {
            console.log(
              "onAnimationEnd",
              turn,
              event.target,
              event.currentTarget,
            );
            if (turn && event.target === event.currentTarget) {
              onTurnEnd();
            }
          }}
        >
          <Paper>{renderPage(shownPage)}</Paper>
        </div>
      </div>
    </div>
  );
}

function Paper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-full overflow-hidden rounded-l-sm rounded-r-md border border-border bg-card text-card-foreground shadow-lg",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-foreground/5 to-transparent"
      />
      {children}
    </div>
  );
}
