import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;

  @IsString({ message: "Must be a string" })
  adminId: string;
}
