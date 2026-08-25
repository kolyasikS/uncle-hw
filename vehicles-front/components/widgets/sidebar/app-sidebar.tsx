"use client";

import { CommandIcon, LayoutDashboardIcon, ListIcon } from "lucide-react";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/widgets/sidebar/nav-main";

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
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5!">
              <CommandIcon className="size-5!" />
              <span className="text-base font-semibold">Vehicle Platform</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
