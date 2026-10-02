"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP_TTL = exports.JWT_PAYLOAD = exports.AUTH_COOKIE_NAME = exports.SESSION_TTL = exports.SESSION_KEYS = exports.EVENT_TYPES = exports.ROLES = exports.SESSION_ROLE_KEY = exports.ROLES_KEY = exports.ADMIN_SESSION_KEY = exports.EVENT_BUS = exports.SESSION_STORE = exports.REDIS_URL_SYMBOL = exports.DATABASE_URL_SYMBOL = exports.REDIS_CLIENT = exports.OTP_REPOSITORY = exports.USER_REPOSITORY = exports.MAIL_REPOSITORY = exports.ADMIN_REPOSITORY = exports.MAIL_FROM = exports.NODE_ENV = exports.JWT_SECRET = exports.REDIS_URL = exports.RABBITMQ_URL = exports.DATABASE_URL = void 0;
require("dotenv/config");
exports.DATABASE_URL = process.env.NESTJS_DATABASE_URL ?? "";
exports.RABBITMQ_URL = process.env.RABBITMQ_URL ?? "";
exports.REDIS_URL = process.env.REDIS_URL ?? "";
exports.JWT_SECRET = process.env.NESTJS_JWT_SECRET ?? "";
exports.NODE_ENV = process.env.NESTJS_NODE_ENV ?? "development";
exports.MAIL_FROM = process.env.NESTJS_EMAIL_FROM ?? "";
exports.ADMIN_REPOSITORY = Symbol("ADMIN_REPOSITORY");
exports.MAIL_REPOSITORY = Symbol("MAIL_REPOSITORY");
exports.USER_REPOSITORY = Symbol("USER_REPOSITORY");
exports.OTP_REPOSITORY = Symbol("OTP_REPOSITORY");
exports.REDIS_CLIENT = Symbol("REDIS_CLIENT");
exports.DATABASE_URL_SYMBOL = Symbol("DATABASE_URL");
exports.REDIS_URL_SYMBOL = Symbol("REDIS_URL");
exports.SESSION_STORE = Symbol("SESSION_STORE");
exports.EVENT_BUS = Symbol("EVENT_BUS");
exports.ADMIN_SESSION_KEY = "admin:session:";
exports.ROLES_KEY = "ROLES_KEY";
exports.SESSION_ROLE_KEY = "SESSION_ROLES_KEY";
exports.ROLES = {
    ADMIN: "ADMIN",
};
exports.EVENT_TYPES = {
    USER_CREATED: "user.created",
};
exports.SESSION_KEYS = {
    [exports.ROLES.ADMIN]: exports.ADMIN_SESSION_KEY,
};
exports.SESSION_TTL = 60 * 60 * 24 * 7;
exports.AUTH_COOKIE_NAME = "ACCESS_TOKEN";
exports.JWT_PAYLOAD = "jwt_payload";
exports.OTP_TTL = 60 * 15;
//# sourceMappingURL=constants.js.map