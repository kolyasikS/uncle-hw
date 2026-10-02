"use client";

import {
  CommandIcon,
  LayoutDashboardIcon,
  ListIcon,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useMemo } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/widgets/sidebar/nav-main";
import { NavSecondary } from "@/components/widgets/sidebar/nav-secondary";
import { useAdminStore } from "@/lib/stores/store";

const data = {
  navMain: [
    {
      title: "Users",
      url: "/dashboard/users",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Vehicles",
      url: "/dashboard/vehicles",
      icon: <ListIcon />,
    },
  ],
  navSecondary: [
    {
      title: "Log Out",
      url: "/api/logout",
      icon: <LogOut />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const admin = useAdminStore((state) => state.admin);
  const clearAdmin = useAdminStore((state) => state.clearAdmin);

  const navSecondaryItems = useMemo(() => {
    return data.navSecondary.map((item) =>
      item.title === "Log Out"
        ? {
            ...item,
            onClick: clearAdmin,
          }
        : item,
    );
  }, [clearAdmin]);

  return (
    <Sidebar collapsible="offcanvas" {...props} className={"bg-[#0D0F12]"}>
      <SidebarHeader className={"bg-[#0d0f12]"}>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href={"/dashboard"} className={"flex gap-2 items-center"}>
              <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5!">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">
                  Vehicle Platform
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className={"bg-[#0d0f12]"}>
        <NavMain items={data.navMain} />
        <NavSecondary items={navSecondaryItems} className={"mt-auto"} />
      </SidebarContent>
    </Sidebar>
  );
}
