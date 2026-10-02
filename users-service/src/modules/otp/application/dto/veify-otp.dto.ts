import { IsEmail, IsString } from "class-validator";

export class VerifyOtpDto {
  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;

  @IsString({ message: "Code must be a string" })
  code: string;
}
