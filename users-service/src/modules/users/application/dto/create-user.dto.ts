import { IsEmail } from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;
}
