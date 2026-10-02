"use client";

import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { User } from "@/lib/entities/user";
import { Vehicle } from "@/lib/entities/vehicle";
import { cn } from "@/lib/utils";

type Props = {
  users: User[];
  vehicles: Vehicle[] | null;
  onUserEdit: (user: User) => void;
  onUserDelete: (userId: string) => void;
  onUserSelect?: (user: User) => void;
};

export function UsersDataTable({
  users,
  vehicles,
  onUserEdit,
  onUserDelete,
  onUserSelect,
}: Props) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const onUserSelectInner = (user: User) => {
    if (user.id === selectedUserId) {
      setSelectedUserId(null);
    } else {
      setSelectedUserId(user.id);
    }
    onUserSelect?.(user);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user: User) => {
          console.log(selectedUserId === user.id);
          return (
            <TableRow
              key={user.id}
              className={cn(
                `cursor-pointer hover:bg-muted/50`,
                selectedUserId === user.id && "bg-muted/50",
              )}
              onClick={() => {
                onUserSelectInner(user);
              }}
            >
              <TableCell>{user.id}</TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={(e) => e.stopPropagation()} // prevent row toggle
                      >
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onUserEdit(user)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => onUserDelete(user.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
