import { z } from "zod";

export const createVehicleSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z
    .number()
    .int("Year must be an integer")
    .min(1886, "Invalid vehicle year")
    .max(new Date().getFullYear() + 1, "Invalid vehicle year")
    .nullable(),
  user_id: z.string().min(1, "User ID is required"),
});

export const updateVehicleSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z
    .number()
    .int("Year must be an integer")
    .min(1886, "Invalid vehicle year")
    .max(new Date().getFullYear() + 1, "Invalid vehicle year"),
});

export type CreateVehicleDto = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleDto = z.infer<typeof updateVehicleSchema>;
