import { type Request, type Response, Router } from "express";
import { VehicleContainer } from "@/application/containers/vehicle.container.js";
import { createVehicleSchema } from "@/application/dto/vehicle.dto.js";
import { ApiResponse } from "@/domain/api-response.js";
import { ACTION_TYPES } from "@/domain/event-types.js";

const router = Router();

router.get("/", async (req, res) => {
  const vehicles = await VehicleContainer.vehicleService.getAll();

  res.status(200).json(
    ApiResponse.success({
      statusCode: 200,
      type: ACTION_TYPES.GET_ALL_VEHICLES,
      message: "Vehicles fetched successfully",
      data: vehicles,
    }),
  );
});

router.get("/:id", async (req, res) => {
  const vehicleId = req.params.id;
  const vehicle = await VehicleContainer.vehicleService.getById(vehicleId);

  res.status(200).json(
    ApiResponse.success({
      statusCode: 201,
      type: ACTION_TYPES.GET_VEHICLE,
      message: "Vehicle fetched successfully",
      data: vehicle,
    }),
  );
});

router.post("/", async (req: Request, res: Response) => {
  const result = createVehicleSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(
      ApiResponse.failure({
        statusCode: 400,
        message: result.error.issues.join(", "),
      }),
    );
  }

  const vehicle = await VehicleContainer.vehicleService.create(req.body);

  return res.status(201).send(
    ApiResponse.success({
      statusCode: 201,
      type: ACTION_TYPES.VEHICLE_CREATED,
      message: "Vehicle created successfully",
      data: vehicle,
    }),
  );
});

router.put("/:id", async (req, res) => {
  const vehicleId = req.params.id;
  const updatedVehicle = await VehicleContainer.vehicleService.update(
    vehicleId,
    req.body,
  );

  res.status(200).send(
    ApiResponse.success({
      statusCode: 200,
      type: ACTION_TYPES.VEHICLE_UPDATED,
      message: "Vehicle updated successfully",
      data: updatedVehicle,
    }),
  );
});

router.delete("/:id", async (req, res) => {
  const vehicleId = req.params.id;
  const deletedVehicle =
    await VehicleContainer.vehicleService.delete(vehicleId);

  res.status(200).send(
    ApiResponse.success({
      statusCode: 200,
      type: ACTION_TYPES.VEHICLE_DELETED,
      message: "Vehicle deleted successfully",
      data: deletedVehicle,
    }),
  );
});

export default router;
