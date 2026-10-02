"use client";

import { useMemo, useState } from "react";
import { CreateUserForm } from "@/app/dashboard/(services)/users/components/CreateUserForm";
import { UpdateUserForm } from "@/app/dashboard/(services)/users/components/UpdateUserForm";
import { UsersDataTable } from "@/app/dashboard/(services)/users/components/UsersDataTable";
import UserVehiclesSection from "@/app/dashboard/(services)/users/components/UserVehiclesSection";
import { Button } from "@/components/ui";
import { useDeleteUser, useUsers } from "@/lib/api/users/user.hooks";
import { useAdminVehicles } from "@/lib/api/vehicles/vehicle.hooks";
import { User } from "@/lib/entities/user";
import { VehicleUser } from "@/lib/entities/vehicle";
import { useAdminStore } from "@/lib/stores/store";

const Page = () => {
  const adminId = useAdminStore((store) => store.admin?.id ?? "");
  const { response: usersRes } = useUsers();
  const { response: vehiclesRes } = useAdminVehicles(adminId);

  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const [formActive, setFormActive] = useState<null | "create" | "update">(
    null,
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { submit: deleteUser } = useDeleteUser({});

  const closeForm = () => {
    setFormActive(null);
    setUpdatedUser(null);
  };

  const onUserEdit = (user: User) => {
    setUpdatedUser(user);
    setFormActive("update");
  };

  const onUserDelete = (userId: string) => {
    deleteUser({ userId });
  };

  const onUserSelect = (user: User) => {
    if (user.id === selectedUser?.id) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  const vehiclesUsers: VehicleUser[] = useMemo(() => {
    if (!vehiclesRes || !selectedUser) {
      return [];
    }

    return vehiclesRes.data
      .filter((vehicle) => vehicle.userId === selectedUser.id)
      .map((vehicle) => ({
        ...vehicle,
        user: selectedUser ?? null,
      }));
  }, [vehiclesRes, selectedUser]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:px-6">
          <div className={"flex flex-col items-center gap-2"}>
            <h2>Users Table</h2>
            {usersRes?.data ? (
              <UsersDataTable
                users={usersRes.data}
                vehicles={vehiclesRes?.data ?? null}
                onUserEdit={onUserEdit}
                onUserDelete={onUserDelete}
                onUserSelect={onUserSelect}
              />
            ) : (
              "No users found."
            )}
          </div>
          <div>
            {formActive === "create" ? (
              <CreateUserForm onClose={closeForm} />
            ) : formActive === "update" && updatedUser ? (
              <UpdateUserForm onClose={closeForm} user={updatedUser} />
            ) : (
              <Button onClick={() => setFormActive("create")}>
                Create a new user
              </Button>
            )}
          </div>
        </div>
        {selectedUser && (
          <UserVehiclesSection
            user={selectedUser}
            vehiclesUsers={vehiclesUsers}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
