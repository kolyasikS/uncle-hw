// envs
import "dotenv/config";
export const DATABASE_URL = process.env.DATABASE_URL ?? "";
export const RABBITMQ_URL = process.env.RABBITMQ_URL ?? "";
export const REDIS_URL = process.env.REDIS_URL ?? "";
export const JWT_SECRET = process.env.JWT_SECRET ?? "";
export const NODE_ENV = process.env.NODE_ENV ?? "development";

// symbols
export const ADMIN_REPOSITORY = Symbol("ADMIN_REPOSITORY");
export const USER_REPOSITORY = Symbol("USER_REPOSITORY");
export const REDIS_CLIENT = Symbol("REDIS_CLIENT");
export const DATABASE_URL_SYMBOL = Symbol("DATABASE_URL");
export const REDIS_URL_SYMBOL = Symbol("REDIS_URL");
export const SESSION_STORE = Symbol("SESSION_STORE");
export const EVENT_BUS = Symbol("EVENT_BUS");

// redis-keys
export const ADMIN_SESSION_KEY = "admin:session:";

// metadata-keys
export const ROLES_KEY = "ROLES_KEY";
export const SESSION_ROLE_KEY = "SESSION_ROLES_KEY";

// enums
export const ROLES = {
  ADMIN: "ADMIN",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const EVENT_TYPES = {
  USER_CREATED: "user.created",
} as const;

export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];

export const SESSION_KEYS = {
  [ROLES.ADMIN]: ADMIN_SESSION_KEY,
};

// general
export const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days
export const AUTH_COOKIE_NAME = "ACCESS_TOKEN";
export const JWT_PAYLOAD = "jwt_payload";
