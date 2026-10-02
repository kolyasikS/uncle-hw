import { dehydrate } from "@tanstack/react-query";
import React from "react";
import { PrefetchedProvider } from "@/components/app/providers";
import { SidebarInset } from "@/components/ui/sidebar";
import { prefetchUsers } from "@/lib/api/users/user.server";
import { prefetchVehicles } from "@/lib/api/vehicles/vehicle.server";
import { createQueryClient } from "@/lib/config/network/ts-query";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = createQueryClient();
  await prefetchUsers(queryClient);
  await prefetchVehicles(queryClient);

  return (
    <PrefetchedProvider state={dehydrate(queryClient)}>
      <SidebarInset>{children}</SidebarInset>
    </PrefetchedProvider>
  );
};

export default Layout;
