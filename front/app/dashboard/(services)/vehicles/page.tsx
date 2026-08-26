"use client";

import { useMemo, useState } from "react";
import { UpdateVehicleForm } from "@/app/dashboard/(services)/vehicles/components/UpdateVehicleForm";
import { VehiclesDataTable } from "@/app/dashboard/(services)/vehicles/components/VehiclesDataTable";
import { useUsers } from "@/lib/api/users/user.hooks";
import {
  useDeleteVehicle,
  useVehicles,
} from "@/lib/api/vehicles/vehicle.hooks";
import { Vehicle, VehicleUser } from "@/lib/entities/vehicle";

const Page = () => {
  const { response: vehiclesRes } = useVehicles();
  const { response: usersRes } = useUsers();

  const [updatedVehicle, setUpdatedVehicle] = useState<Vehicle | null>(null);
  const [formActive, setFormActive] = useState<null | "update">(null);

  const { submit: deleteVehicle } = useDeleteVehicle({});

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

  const vehiclesUsers: VehicleUser[] = useMemo(() => {
    if (!vehiclesRes) {
      return [];
    }

    return vehiclesRes.data.map((vehicle) => ({
      ...vehicle,
      user: usersRes?.data?.find((user) => user.id === vehicle.userId) ?? null,
    }));
  }, [vehiclesRes, usersRes]);

  console.log(vehiclesRes?.data, usersRes?.data, vehiclesUsers);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:px-6">
          {vehiclesUsers ? (
            <VehiclesDataTable
              vehicles={vehiclesUsers}
              onVehicleEdit={onVehicleEdit}
              onVehicleDelete={onVehicleDelete}
            />
          ) : (
            "No vehicles found."
          )}
          <div>
            {formActive === "update" && updatedVehicle && (
              <UpdateVehicleForm onClose={closeForm} vehicle={updatedVehicle} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
