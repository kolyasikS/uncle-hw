"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsException = exports.AdminNotFoundException = exports.UserNotFoundException = exports.UserAlreadyExistsException = exports.ValidationPipeException = void 0;
const common_1 = require("@nestjs/common");
const admin_messages_1 = require("../messages/admin.messages");
const auth_messages_1 = require("../messages/auth.messages");
const user_messages_1 = require("../messages/user.messages");
class ValidationPipeException extends common_1.BadRequestException {
    constructor(errors) {
        super(...errors.map((error) => Object.values(error.constraints ?? ""))[0]);
    }
}
exports.ValidationPipeException = ValidationPipeException;
class UserAlreadyExistsException extends common_1.HttpException {
    constructor(email) {
        super(user_messages_1.createUserMessages.alreadyExists(email), common_1.HttpStatus.CONFLICT);
        this.name = "UserAlreadyExistsException";
    }
}
exports.UserAlreadyExistsException = UserAlreadyExistsException;
class UserNotFoundException extends common_1.HttpException {
    constructor(id) {
        super(user_messages_1.getUserByIdMessages.notFound(id), common_1.HttpStatus.NOT_FOUND);
        this.name = "UserNotFoundException";
    }
}
exports.UserNotFoundException = UserNotFoundException;
class AdminNotFoundException extends common_1.HttpException {
    constructor(email) {
        super(admin_messages_1.getAdminMessages.notFoundEmail(email), common_1.HttpStatus.NOT_FOUND);
        this.name = "AdminNotFoundException";
    }
}
exports.AdminNotFoundException = AdminNotFoundException;
class InvalidCredentialsException extends common_1.HttpException {
    constructor() {
        super(auth_messages_1.loginMessages.invalidCredentials, common_1.HttpStatus.UNAUTHORIZED);
        this.name = "InvalidCredentialsException";
    }
}
exports.InvalidCredentialsException = InvalidCredentialsException;
//# sourceMappingURL=domain.exceptions.js.map