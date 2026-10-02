import { model, Schema } from "mongoose";

export interface VehicleDocument {
  make: string;
  model: string;
  year: number | null;
  photos: string[];
  user_id: string;
  admin_id: string;
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
  photos: [
    {
      type: String,
    },
  ],
  user_id: {
    type: String,
    required: true,
  },
  admin_id: {
    type: String,
    required: true,
  },
});

export const VehicleModel = model<VehicleDocument>("Vehicle", vehicleSchema);
export type VehicleModelType = typeof VehicleModel;
