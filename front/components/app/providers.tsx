"use client";

import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { Toaster } from "@/components/ui";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
};

export default Providers;

export const PrefetchedProvider = ({
  state,
  children,
}: {
  state: DehydratedState;
  children: React.ReactNode;
}) => {
  console.log("hydrating queries:", state.queries.length); // must be > 0

  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
};
