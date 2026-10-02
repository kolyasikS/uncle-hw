"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpAdminMessages = exports.createAdminMessages = exports.getAdminMessages = void 0;
exports.getAdminMessages = {
    success: "Admin retrieved successfully",
    failure: "Failed to retrieve admin",
    notFoundEmail: (email) => `Admin with email ${email} not found`,
};
exports.createAdminMessages = {
    success: "Admin created successfully",
    failure: "Failed to create admin",
    alreadyExists: (email) => `Admin with email ${email} already exists`,
};
exports.signUpAdminMessages = {
    success: "You registered successfully",
    failure: "Failed to register",
};
//# sourceMappingURL=admin.messages.js.map