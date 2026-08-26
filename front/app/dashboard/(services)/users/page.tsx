"use client";

import { useState } from "react";
import { CreateUserForm } from "@/app/dashboard/(services)/users/components/CreateUserForm";
import { UpdateUserForm } from "@/app/dashboard/(services)/users/components/UpdateUserForm";
import { UsersDataTable } from "@/app/dashboard/(services)/users/components/UsersDataTable";
import { Button } from "@/components/ui";
import { useDeleteUser, useUsers } from "@/lib/api/users/user.hooks";
import { User } from "@/lib/entities/user";

const Page = () => {
  const { response: usersRes } = useUsers();

  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const [formActive, setFormActive] = useState<null | "create" | "update">(
    null,
  );

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

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:px-6">
          {usersRes ? (
            <UsersDataTable
              users={usersRes.data}
              onUserEdit={onUserEdit}
              onUserDelete={onUserDelete}
            />
          ) : (
            "No users found."
          )}
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
      </div>
    </div>
  );
};

export default Page;
