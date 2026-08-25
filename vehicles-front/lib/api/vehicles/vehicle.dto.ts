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
