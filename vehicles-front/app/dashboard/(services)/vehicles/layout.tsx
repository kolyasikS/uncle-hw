import { dehydrate } from "@tanstack/react-query";
import React from "react";
import { PrefetchedProvider } from "@/components/app/providers";
import { SidebarInset } from "@/components/ui/sidebar";
import { prefetchUsers } from "@/lib/api/users/user.server";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = await prefetchUsers();

  return (
    <PrefetchedProvider state={dehydrate(queryClient)}>
      <SidebarInset>{children}</SidebarInset>
    </PrefetchedProvider>
  );
};

export default Layout;
