"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { UpdateVehicleForm } from "@/app/dashboard/(services)/vehicles/components/UpdateVehicleForm";
import { VehiclesDataTable } from "@/app/dashboard/(services)/vehicles/components/VehiclesDataTable";
import { FileUploadButton } from "@/components/features";
import { useUsers } from "@/lib/api/users/user.hooks";
import {
  useAdminVehicles,
  useDeleteVehicle,
  useUploadVehiclePhotos,
} from "@/lib/api/vehicles/vehicle.hooks";
import { Vehicle, VehicleUser } from "@/lib/entities/vehicle";
import { useAdminStore } from "@/lib/stores/store";

const Page = () => {
  const adminId = useAdminStore((state) => state.admin?.id ?? "");
  const { response: vehiclesRes } = useAdminVehicles(adminId);
  const { response: usersRes } = useUsers();

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [updatedVehicle, setUpdatedVehicle] = useState<Vehicle | null>(null);
  const [formActive, setFormActive] = useState<null | "update">(null);

  const { submit: deleteVehicle } = useDeleteVehicle({ adminId });
  const { submit: uploadVehiclePhotos } = useUploadVehiclePhotos({
    adminId,
    onSuccess: (vehicle: Vehicle) => setSelectedVehicle(vehicle),
  });

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

  const onVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const onFilesChange = (files: FileList | null) => {
    if (!files?.length || !selectedVehicle?.id) {
      return;
    }
    uploadVehiclePhotos({ vehicleId: selectedVehicle?.id, data: files });
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

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:px-6">
          {vehiclesUsers ? (
            <VehiclesDataTable
              vehicles={vehiclesUsers}
              onVehicleSelect={onVehicleSelect}
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
          {selectedVehicle && (
            <div className={"flex flex-col w-full gap-4"}>
              <h3 className={"text-xl font-bold text-center"}>Photos</h3>
              {selectedVehicle.photos?.length ? (
                <ul className={"flex flex-wrap gap-2 justify-center"}>
                  {selectedVehicle.photos?.map((photo) => (
                    <li key={photo}>
                      <Image src={photo} alt={""} width={400} height={250} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={"space-y-1"}>
                  <p className={"w-full text-red-700 flex items-center"}>
                    No photos for this vehicle <X className={"inline"} />
                  </p>
                </div>
              )}
              <FileUploadButton multiple={true} onFileSelect={onFilesChange}>
                Upload new photo
              </FileUploadButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
