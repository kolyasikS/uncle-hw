import { model, Schema } from "mongoose";
import type { Vehicle } from "@/domain/entities/vehicle.entity.js";

export interface VehicleDocument {
  make: string;
  model: string;
  year: number | null;
  user_id: string;
}

const vehicleSchema = new Schema<VehicleDocument>({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    allowNull: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

export const VehicleModel = model<VehicleDocument>("Vehicle", vehicleSchema);
export type VehicleModelType = typeof VehicleModel;
