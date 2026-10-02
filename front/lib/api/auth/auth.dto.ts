import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string(),
});

export type AdminLoginDto = z.infer<typeof adminLoginSchema>;

export const adminSendRegistrationEmailSchema = z.object({
  email: z.email("Invalid email address"),
});

export type AdminSendRegistrationEmailDto = z.infer<
  typeof adminSendRegistrationEmailSchema
>;

export const adminConfirmRegistrationCodeSchema = z.object({
  code: z.string().length(6, "Code must be 6 characters"),
});

export type AdminConfirmRegistrationCodeDto = z.infer<
  typeof adminConfirmRegistrationCodeSchema
>;

export const adminSignUpSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { error: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Attaches the error specifically to confirmPassword
  });

export type AdminSignUpDto = z.infer<typeof adminSignUpSchema>;
