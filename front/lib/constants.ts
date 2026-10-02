// envs
export const USER_SERVICE_API_URL =
  process.env.NEXT_PUBLIC_USER_SERVICE_API_URL;
export const VEHICLE_SERVICE_API_URL =
  process.env.NEXT_PUBLIC_VEHICLE_SERVICE_API_URL;
export const AUTH_COOKIE_NAME = process.env.NEXT_AUTH_COOKIE_NAME ?? "";
export const AUTH_VERIFY_PATH = process.env.NEXT_AUTH_VERIFY_PATH;
export const SERVER_USER_SERVICE_API_URL =
  process.env.NEXT_SERVER_USER_SERVICE_API_URL;
export const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;

// timing
export const STALE_TIME = {
  SHORT: 1000 * 60 * 60,
};
