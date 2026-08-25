import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Vehicle, VehicleUser } from "@/lib/entities/vehicle";

type Props = {
  vehicles: VehicleUser[];
  onVehicleEdit: (vehicle: Vehicle) => void;
  onVehicleDelete: (vehicleId: string) => void;
};
export function VehiclesDataTable({
  vehicles,
  onVehicleEdit,
  onVehicleDelete,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Make</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>User</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle: VehicleUser) => (
          <TableRow key={vehicle.id}>
            <TableCell>{vehicle.id}</TableCell>
            <TableCell>{vehicle.make}</TableCell>
            <TableCell>{vehicle.model}</TableCell>
            <TableCell>{vehicle.year ?? "-"}</TableCell>
            <TableCell>{vehicle.user?.email ?? "Not available"}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onVehicleEdit(vehicle)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => onVehicleDelete(vehicle.id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
