import { z } from "zod";

export const updateVehicleSchema = z.object({
  make: z.string("Must be string"),
  model: z.string("Must be string"),
  year: z
    .number("Year must be a number")
    .gte(1900, "Year must be 1900 or later")
    .lte(new Date().getFullYear(), "Year cannot be in the future")
    .nullable(),
});

export type UpdateVehicleDto = z.infer<typeof updateVehicleSchema>;

export const createVehicleClientSchema = z.object({
  make: z.string("Must be string"),
  model: z.string("Must be string"),
  year: z
    .number("Year must be a number")
    .gte(1900, "Year must be 1900 or later")
    .lte(new Date().getFullYear(), "Year cannot be in the future")
    .nullable(),
  userId: z.string("Must be string"),
  adminId: z.string("Must be string"),
});

export const createVehicleSchema = createVehicleClientSchema.transform(
  (data) => ({
    make: data.make,
    model: data.model,
    year: data.year,
    user_id: data.userId,
    admin_id: data.adminId,
  }),
);

export type CreateVehicleDto = z.infer<typeof createVehicleClientSchema>;
