import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
} from "@nestjs/common";
import { ApiResponse, type ApiResponseType } from "@/domain/api-response";
import { EVENT_TYPES, ROLES } from "@/domain/constants";
import { AdminId } from "@/domain/decorators/admin-id.decorator";
import {
  createUserMessages,
  deleteUserMessages,
  getAllUsersMessages,
  getUserByIdMessages,
  updateUserMessages,
} from "@/domain/messages/user.messages";
import { Session } from "@/modules/iam/domain/decorators/auth.decorator";
import { CreateUserDto } from "@/modules/users/application/dto/create-user.dto";
import { type UpdateUserDto } from "@/modules/users/application/dto/update-user.dto";
import { CreateUserUseCase } from "@/modules/users/application/use-cases/create-user.use-case";
import { DeleteUserUseCase } from "@/modules/users/application/use-cases/delete-user.use-case";
import { GetUserByIdUseCase } from "@/modules/users/application/use-cases/get-user-by-id.use-case";
import { GetUsersUseCase } from "@/modules/users/application/use-cases/get-users.use-case";
import { UpdateUserUseCase } from "@/modules/users/application/use-cases/update-user.use-case";
import { User } from "@/modules/users/domain/domain/entities/user.entity";
import { ValidationPipe } from "@/presentation/pipes/validation.pipe";

@Session(ROLES.ADMIN)
@UsePipes(ValidationPipe)
@Controller("users")
export class UsersController {
  constructor(
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponseType<User>> {
    const user = await this.createUserUseCase.execute(createUserDto);
    return ApiResponse.success({
      data: user,
      message: createUserMessages.success,
      statusCode: HttpStatus.CREATED,
      event: EVENT_TYPES.USER_CREATED,
    });
  }

  @Get("")
  async getAll(@AdminId() adminId: string): Promise<ApiResponseType<User[]>> {
    const users = await this.getUsersUseCase.execute(adminId);
    return ApiResponse.success({
      data: users,
      statusCode: HttpStatus.OK,
      message: getAllUsersMessages.success,
    });
  }

  @Get(":id")
  async getUserById(
    @Param("id", new ParseUUIDPipe({ version: "7" })) id: string,
  ): Promise<ApiResponseType<User | null>> {
    const user = await this.getUserByIdUseCase.execute(id);
    return ApiResponse.success({
      data: user,
      statusCode: HttpStatus.OK,
      message: getUserByIdMessages.success,
    });
  }

  @Put(":id")
  async update(
    @Param("id", new ParseUUIDPipe({ version: "7" })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponseType<User>> {
    const user = await this.updateUserUseCase.execute(id, updateUserDto);
    return ApiResponse.success({
      data: user,
      message: updateUserMessages.success,
      statusCode: HttpStatus.CREATED,
    });
  }

  @Delete(":id")
  async delete(
    @Param("id", new ParseUUIDPipe({ version: "7" })) id: string,
  ): Promise<ApiResponseType<User>> {
    const user = await this.deleteUserUseCase.execute(id);

    return ApiResponse.success({
      data: user,
      message: deleteUserMessages.success,
      statusCode: HttpStatus.OK,
    });
  }
}
