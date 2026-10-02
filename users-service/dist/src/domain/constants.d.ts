import "dotenv/config";
export declare const DATABASE_URL: string;
export declare const RABBITMQ_URL: string;
export declare const REDIS_URL: string;
export declare const JWT_SECRET: string;
export declare const NODE_ENV: string;
export declare const MAIL_FROM: string;
export declare const ADMIN_REPOSITORY: unique symbol;
export declare const MAIL_REPOSITORY: unique symbol;
export declare const USER_REPOSITORY: unique symbol;
export declare const OTP_REPOSITORY: unique symbol;
export declare const REDIS_CLIENT: unique symbol;
export declare const DATABASE_URL_SYMBOL: unique symbol;
export declare const REDIS_URL_SYMBOL: unique symbol;
export declare const SESSION_STORE: unique symbol;
export declare const EVENT_BUS: unique symbol;
export declare const ADMIN_SESSION_KEY = "admin:session:";
export declare const ROLES_KEY = "ROLES_KEY";
export declare const SESSION_ROLE_KEY = "SESSION_ROLES_KEY";
export declare const ROLES: {
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof ROLES)[keyof typeof ROLES];
export declare const EVENT_TYPES: {
    readonly USER_CREATED: "user.created";
};
export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];
export declare const SESSION_KEYS: {
    ADMIN: string;
};
export declare const SESSION_TTL: number;
export declare const AUTH_COOKIE_NAME = "ACCESS_TOKEN";
export declare const JWT_PAYLOAD = "jwt_payload";
export declare const OTP_TTL: number;
