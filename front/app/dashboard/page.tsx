"use client";

import { Car, User } from "lucide-react";
import { SidebarInset, Skeleton } from "@/components/ui";
import { useUsers } from "@/lib/api/users/user.hooks";
import { useAdminVehicles } from "@/lib/api/vehicles/vehicle.hooks";
import { useAdminStore } from "@/lib/stores/store";

const quickActions = [
  {
    icon: User,
    title: "Add a user",
    desc: "Register a new user",
    link: "/dashboard/users",
  },
  {
    icon: Car,
    title: "Add a vehicle",
    desc: "Register a new car for your user.",
    link: "/dashboard/vehicles",
  },
];

const statusStyles: Record<string, string> = {
  ok: "bg-[#163824] text-[#4ADE80]",
  due: "bg-[#3D280A] text-[#FBBF24]",
  overdue: "bg-[#3D1414] text-[#F87171]",
};

export default function Page() {
  const adminId = useAdminStore((store) => store.admin?.id ?? "");
  const { response: usersRes, isLoading: isUsersLoading } = useUsers();
  const { response: vehiclesRes, isLoading: isVehiclesLoading } =
    useAdminVehicles(adminId);

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <SidebarInset>
      <div className="bg-background font-sans text-[#ECEFF5]">
        {/* Hero */}
        <div className="border-b border-[#222733] bg-[#161920] px-5 py-7 sm:px-12 sm:pb-8 sm:pt-12">
          <p className="mb-2.5 text-[13px] font-medium tracking-[0.01em] text-[#63758A]">
            {greeting}
          </p>
          <h1 className="mb-3.5 max-w-[520px] font-serif text-[clamp(28px,4vw,40px)] font-normal leading-[1.15] text-[#ECEFF5]">
            Your garage,
            <br />
            <em className="font-serif italic text-[#7AA2E3]">
              all in one place.
            </em>
          </h1>
          <p className="max-w-[400px] text-[14.5px] leading-relaxed text-[#94A3B8]">
            Track ownership history.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 gap-px border-b border-[#222733] bg-black">
          <div className="bg-[#161920] p-4 sm:px-8 sm:py-6">
            <div className="mb-1 font-serif text-2xl sm:text-[36px] leading-none text-[#ECEFF5]">
              {isUsersLoading ? (
                <Skeleton className="h-9 w-9 rounded-full" />
              ) : (
                (usersRes?.data.length ?? 0)
              )}
            </div>
            <div className="text-[12.5px] font-medium text-[#63758A]">
              Users
            </div>
          </div>
          <div className="bg-[#161920] p-4 sm:px-8 sm:py-6">
            <div className="mb-1 font-serif text-2xl sm:text-[36px] leading-none text-[#ECEFF5]">
              {isVehiclesLoading ? (
                <Skeleton className="h-9 w-9 rounded-full" />
              ) : (
                (vehiclesRes?.data.length ?? 0)
              )}
            </div>
            <div className="text-[12.5px] font-medium text-[#63758A]">
              Vehicles
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 pb-10 pt-6 sm:px-12 sm:pb-12 sm:pt-9">
          {/* Quick actions */}
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#63758A]">
            Quick actions
          </p>
          <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
            {quickActions.map((a) => (
              <a
                key={a.title}
                href={a.link}
                className="block rounded-lg border border-[#222733] bg-[#161920] p-6 text-inherit no-underline transition-[border-color,box-shadow,background-color] duration-150 hover:border-[#7AA2E3] hover:bg-[#1A1F29] hover:shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#222733] text-lg">
                  {<a.icon />}
                </div>
                <p className="mb-1.5 text-sm font-semibold text-[#ECEFF5]">
                  {a.title}
                </p>
                <p className="text-[13px] leading-normal text-[#63758A]">
                  {a.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
