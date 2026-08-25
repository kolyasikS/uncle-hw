"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const api_response_1 = require("../../../domain/api-response");
const constants_1 = require("../../../domain/constants");
const user_messages_1 = require("../../../domain/messages/user.messages");
const auth_decorator_1 = require("../../iam/domain/decorators/auth.decorator");
const create_user_dto_1 = require("../application/dto/create-user.dto");
const update_user_dto_1 = require("../application/dto/update-user.dto");
const create_user_use_case_1 = require("../application/use-cases/create-user.use-case");
const delete_user_use_case_1 = require("../application/use-cases/delete-user.use-case");
const get_user_by_id_use_case_1 = require("../application/use-cases/get-user-by-id.use-case");
const get_users_use_case_1 = require("../application/use-cases/get-users.use-case");
const update_user_use_case_1 = require("../application/use-cases/update-user.use-case");
const validation_pipe_1 = require("../../../presentation/pipes/validation.pipe");
let UsersController = class UsersController {
    getUsersUseCase;
    createUserUseCase;
    getUserByIdUseCase;
    updateUserUseCase;
    deleteUserUseCase;
    constructor(getUsersUseCase, createUserUseCase, getUserByIdUseCase, updateUserUseCase, deleteUserUseCase) {
        this.getUsersUseCase = getUsersUseCase;
        this.createUserUseCase = createUserUseCase;
        this.getUserByIdUseCase = getUserByIdUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
    }
    async create(createUserDto) {
        const user = await this.createUserUseCase.execute(createUserDto);
        return api_response_1.ApiResponse.success({
            data: user,
            message: user_messages_1.createUserMessages.success,
            statusCode: common_1.HttpStatus.CREATED,
            event: constants_1.EVENT_TYPES.USER_CREATED,
        });
    }
    async getAll() {
        const users = await this.getUsersUseCase.execute();
        return api_response_1.ApiResponse.success({
            data: users,
            statusCode: common_1.HttpStatus.OK,
            message: user_messages_1.getAllUsersMessages.success,
        });
    }
    async getUserById(id) {
        const user = await this.getUserByIdUseCase.execute(id);
        return api_response_1.ApiResponse.success({
            data: user,
            statusCode: common_1.HttpStatus.OK,
            message: user_messages_1.getUserByIdMessages.success,
        });
    }
    async update(id, updateUserDto) {
        const user = await this.updateUserUseCase.execute(id, updateUserDto);
        return api_response_1.ApiResponse.success({
            data: user,
            message: user_messages_1.updateUserMessages.success,
            statusCode: common_1.HttpStatus.CREATED,
        });
    }
    async delete(id) {
        const user = await this.deleteUserUseCase.execute(id);
        return api_response_1.ApiResponse.success({
            data: user,
            message: user_messages_1.deleteUserMessages.success,
            statusCode: common_1.HttpStatus.OK,
        });
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", new common_1.ParseUUIDPipe({ version: "7" }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id", new common_1.ParseUUIDPipe({ version: "7" }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id", new common_1.ParseUUIDPipe({ version: "7" }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
exports.UsersController = UsersController = __decorate([
    (0, auth_decorator_1.Session)(constants_1.ROLES.ADMIN),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [get_users_use_case_1.GetUsersUseCase,
        create_user_use_case_1.CreateUserUseCase,
        get_user_by_id_use_case_1.GetUserByIdUseCase,
        update_user_use_case_1.UpdateUserUseCase,
        delete_user_use_case_1.DeleteUserUseCase])
], UsersController);
//# sourceMappingURL=users.controller.js.map