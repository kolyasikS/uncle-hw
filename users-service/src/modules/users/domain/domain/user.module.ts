import { Module } from "@nestjs/common";
import { EVENT_BUS, USER_REPOSITORY } from "@/domain/constants";
import { MessageBrokerModule } from "@/infrastructure/message-broker/message-broker.module";
import { RabbitMQEventBus } from "@/infrastructure/message-broker/rabbitmq/rabbitmq-event-bus.service";
import { IamModule } from "@/modules/iam/domain/iam.module";
import { CreateUserUseCase } from "@/modules/users/application/use-cases/create-user.use-case";
import { DeleteUserUseCase } from "@/modules/users/application/use-cases/delete-user.use-case";
import { GetUserByIdUseCase } from "@/modules/users/application/use-cases/get-user-by-id.use-case";
import { GetUsersUseCase } from "@/modules/users/application/use-cases/get-users.use-case";
import { UpdateUserUseCase } from "@/modules/users/application/use-cases/update-user.use-case";
import { PrismaUserRepository } from "@/modules/users/infrastructure/repositories/prisma-user.repository";
import { UsersController } from "@/modules/users/presentation/users.controller";

@Module({
  imports: [MessageBrokerModule, IamModule],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    GetUsersUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: EVENT_BUS,
      useExisting: RabbitMQEventBus,
    },
  ],
})
export class UserModule {}
