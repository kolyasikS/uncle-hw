"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../domain/constants");
const message_broker_module_1 = require("../../../../infrastructure/message-broker/message-broker.module");
const rabbitmq_event_bus_service_1 = require("../../../../infrastructure/message-broker/rabbitmq/rabbitmq-event-bus.service");
const iam_module_1 = require("../../../iam/domain/iam.module");
const create_user_use_case_1 = require("../../application/use-cases/create-user.use-case");
const delete_user_use_case_1 = require("../../application/use-cases/delete-user.use-case");
const get_user_by_id_use_case_1 = require("../../application/use-cases/get-user-by-id.use-case");
const get_users_use_case_1 = require("../../application/use-cases/get-users.use-case");
const update_user_use_case_1 = require("../../application/use-cases/update-user.use-case");
const prisma_user_repository_1 = require("../../infrastructure/repositories/prisma-user.repository");
const users_controller_1 = require("../../presentation/users.controller");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [message_broker_module_1.MessageBrokerModule, iam_module_1.IamModule],
        controllers: [users_controller_1.UsersController],
        providers: [
            create_user_use_case_1.CreateUserUseCase,
            get_users_use_case_1.GetUsersUseCase,
            get_user_by_id_use_case_1.GetUserByIdUseCase,
            update_user_use_case_1.UpdateUserUseCase,
            delete_user_use_case_1.DeleteUserUseCase,
            {
                provide: constants_1.USER_REPOSITORY,
                useClass: prisma_user_repository_1.PrismaUserRepository,
            },
            {
                provide: constants_1.EVENT_BUS,
                useExisting: rabbitmq_event_bus_service_1.RabbitMQEventBus,
            },
        ],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map