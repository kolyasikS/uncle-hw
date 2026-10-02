import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { Button, Input, Label, toast } from "@/components/ui";
import {
  UpdateVehicleDto,
  updateVehicleSchema,
} from "@/lib/api/vehicles/vehicle.dto";
import { useUpdateVehicle } from "@/lib/api/vehicles/vehicle.hooks";
import { Vehicle } from "@/lib/entities/vehicle";
import { useAdminStore } from "@/lib/stores/store";

type Props = {
  onClose?: () => void;
  vehicle: Vehicle;
};
export function UpdateVehicleForm({ onClose, vehicle }: Props) {
  const adminId = useAdminStore((store) => store.admin?.id ?? "");
  const form = useForm<UpdateVehicleDto>({
    resolver: zodResolver(updateVehicleSchema),
    defaultValues: {
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
    },
  });

  const {
    submit: updateVehicle,
    isPending,
    isError,
  } = useUpdateVehicle({
    adminId,
    onSuccess: onClose,
  });

  function onSubmit(data: UpdateVehicleDto) {
    updateVehicle({ vehicleId: vehicle.id, data });
  }

  const onInvalid = (errors: FieldErrors<UpdateVehicleDto>) => {
    const firstError = Object.values(errors)[0];

    toast.error(firstError?.message ?? "Please fix the validation errors");
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="make">Make</Label>
        <Input id="make" placeholder="BMW" {...form.register("make")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="model">Model</Label>
        <Input id="model" placeholder="M5" {...form.register("model")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="year">Year</Label>
        <Input
          id="year"
          type={"number"}
          placeholder="2021"
          {...form.register("year", {
            setValueAs: (value) => (value === "" ? null : Number(value)),
          })}
        />
      </div>

      <div className={"flex gap-3"}>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update vehicle"}
        </Button>
        <Button onClick={onClose}>{"Close"}</Button>
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
