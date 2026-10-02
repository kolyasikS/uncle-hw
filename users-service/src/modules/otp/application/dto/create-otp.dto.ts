import { IsEmail } from "class-validator";

export class CreateOtpDto {
  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;
}
