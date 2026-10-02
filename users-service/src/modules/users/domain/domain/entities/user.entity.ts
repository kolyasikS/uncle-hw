import { CreateUserDto } from "@/modules/users/application/dto/create-user.dto";
import { UpdateUserDto } from "@/modules/users/application/dto/update-user.dto";

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly adminId: string,
  ) {}

  static create(createUserDto: CreateUserDto) {
    return new User(
      crypto.randomUUID(),
      createUserDto.email,
      createUserDto.adminId,
    );
  }

  static update(existingUser: User, updateUserDto: UpdateUserDto) {
    return new User(existingUser.id, updateUserDto.email, existingUser.adminId);
  }
}
