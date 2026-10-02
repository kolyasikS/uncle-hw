import { useState } from "react";
import { CreateVehicleForm } from "@/app/dashboard/(services)/vehicles/components/CreateVehicleForm";
import { UpdateVehicleForm } from "@/app/dashboard/(services)/vehicles/components/UpdateVehicleForm";
import { VehiclesDataTable } from "@/app/dashboard/(services)/vehicles/components/VehiclesDataTable";
import { Button } from "@/components/ui";
import { useDeleteVehicle } from "@/lib/api/vehicles/vehicle.hooks";
import { User } from "@/lib/entities/user";
import { Vehicle, VehicleUser } from "@/lib/entities/vehicle";
import { useAdminStore } from "@/lib/stores/store";

type Props = {
  vehiclesUsers: VehicleUser[];
  user: User;
};
const UserVehiclesSection = ({ vehiclesUsers, user }: Props) => {
  const adminId = useAdminStore((store) => store.admin?.id ?? "");
  const [formActive, setFormActive] = useState<null | "create" | "update">(
    null,
  );
  const [updatedVehicle, setUpdatedVehicle] = useState<Vehicle | null>(null);

  const { submit: deleteVehicle } = useDeleteVehicle({ adminId });

  const closeForm = () => {
    setFormActive(null);
    setUpdatedVehicle(null);
  };

  const onVehicleEdit = (vehicle: Vehicle) => {
    setUpdatedVehicle(vehicle);
    setFormActive("update");
  };

  const onVehicleDelete = (vehicleId: string) => {
    deleteVehicle({ vehicleId });
  };

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:px-6">
      <div className={"flex flex-col items-center gap-2"}>
        <h2>Vehicles Table</h2>
        {vehiclesUsers.length > 0 ? (
          <VehiclesDataTable
            vehicles={vehiclesUsers}
            onVehicleEdit={onVehicleEdit}
            onVehicleDelete={onVehicleDelete}
          />
        ) : (
          "No vehicles found."
        )}
      </div>
      <div>
        {formActive === "create" ? (
          <CreateVehicleForm onClose={closeForm} userId={user.id} />
        ) : formActive === "update" && updatedVehicle ? (
          <UpdateVehicleForm onClose={closeForm} vehicle={updatedVehicle} />
        ) : (
          <Button onClick={() => setFormActive("create")}>
            Create a new vehicle
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserVehiclesSection;
