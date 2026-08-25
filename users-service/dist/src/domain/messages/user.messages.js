"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserMessages = exports.updateUserMessages = exports.getUserByIdMessages = exports.getAllUsersMessages = exports.createUserMessages = void 0;
exports.createUserMessages = {
    success: "User created successfully",
    failure: "Failed to create user",
    alreadyExists: (email) => `User with email ${email} already exists`,
};
exports.getAllUsersMessages = {
    success: "Successfully retrieved users",
    failure: "Users retrieving failed",
};
exports.getUserByIdMessages = {
    success: "User retrieved successfully",
    failure: "Failed to retrieve user",
    notFound: (id) => `User with ID ${id} not found`,
};
exports.updateUserMessages = {
    success: "User updated successfully",
    failure: "Failed to update user",
};
exports.deleteUserMessages = {
    success: "User deleted successfully",
    failure: "Failed to delete user",
};
//# sourceMappingURL=user.messages.js.map