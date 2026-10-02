import { z } from "zod";

export const createUserSchema = z.object({
  email: z.email("Invalid email address"),
  adminId: z.string("Invalid string"),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  email: z.email("Invalid email address"),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
