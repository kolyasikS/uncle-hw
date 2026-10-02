import { type Request, type Response, Router } from "express";
import { VehicleContainer } from "@/application/containers/vehicle.container.js";
import { createVehicleSchema } from "@/application/dto/vehicle.dto.js";
import { setUploadFolder } from "@/application/middlewares/set-upload-folder.middleware";
import { ApiResponse } from "@/domain/api-response.js";
import { ACTION_TYPES } from "@/domain/event-types.js";
import { upload } from "@/infrastructure/config/multer";
import { VehicleMapper } from "@/infrastructure/mappers/vehicle.mapper";

const router = Router();

router.get("/admin/:adminId", async (req, res) => {
  const adminId = req.params.adminId;
  const vehicles = await VehicleContainer.vehicleService.getByAdminId(adminId);

  res.status(200).json(
    ApiResponse.success({
      statusCode: 200,
      type: ACTION_TYPES.GET_ALL_VEHICLES,
      message: "Vehicles fetched successfully",
      data: vehicles.map((vehicle) => VehicleMapper.toHttp(req, res, vehicle)),
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
      data: VehicleMapper.toHttp(req, res, vehicle),
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
      data: VehicleMapper.toHttp(req, res, vehicle),
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
      data: VehicleMapper.toHttp(req, res, updatedVehicle),
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

router.post(
  "/:id/photos",
  setUploadFolder("photos"), // Target folder: uploads/avatars
  upload.array("photos", 5),
  async (req: Request, res: Response) => {
    console.log("photos");
    const files = req.files as Express.Multer.File[];
    const vehicleId = req.params.id as string;
    const updatedVehicle = await VehicleContainer.vehicleService.uploadPhotos(
      vehicleId,
      files,
    );

    res.status(200).send(
      ApiResponse.success({
        statusCode: 200,
        message: "Photos uploaded",
        data: VehicleMapper.toHttp(req, res, updatedVehicle),
      }),
    );
  },
);

export default router;
