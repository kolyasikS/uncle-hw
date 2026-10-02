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
import { Vehicle, VehicleUser } from "@/lib/entities/vehicle";
import { cn } from "@/lib/utils";

type Props = {
  vehicles: VehicleUser[];
  onVehicleEdit?: (vehicle: Vehicle) => void;
  onVehicleSelect?: (vehicle: Vehicle) => void;
  onVehicleDelete?: (vehicleId: string) => void;
  readonly?: boolean;
};
export function VehiclesDataTable({
  vehicles,
  onVehicleEdit,
  onVehicleSelect,
  onVehicleDelete,
  readonly = false,
}: Props) {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null,
  );

  const onVehicleSelectInner = (vehicle: Vehicle) => {
    if (vehicle.id === selectedVehicleId) {
      setSelectedVehicleId(null);
    } else {
      setSelectedVehicleId(vehicle.id);
    }
    onVehicleSelect?.(vehicle);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Make</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>User</TableHead>
          {!readonly && <TableHead className="text-right">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle: VehicleUser) => (
          <TableRow
            key={vehicle.id}
            className={cn(
              `cursor-pointer hover:bg-muted/50`,
              selectedVehicleId === vehicle.id && "bg-muted/50",
            )}
            onClick={() => onVehicleSelectInner(vehicle)}
          >
            <TableCell>{vehicle.id}</TableCell>
            <TableCell>{vehicle.make}</TableCell>
            <TableCell>{vehicle.model}</TableCell>
            <TableCell>{vehicle.year ?? "-"}</TableCell>
            <TableCell>{vehicle.user?.email ?? "Not available"}</TableCell>
            {!readonly && (
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
                    {onVehicleEdit && (
                      <DropdownMenuItem onClick={() => onVehicleEdit(vehicle)}>
                        Edit
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    {onVehicleDelete && (
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => onVehicleDelete(vehicle.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
