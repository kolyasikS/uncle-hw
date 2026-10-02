import axios from "axios";
import { USER_SERVICE_API_URL, VEHICLE_SERVICE_API_URL } from "@/lib/constants";

const attachServerCookies = async (
  config: import("axios").InternalAxiosRequestConfig,
) => {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    const token = cookieStore.get("ACCESS_TOKEN")?.value;

    if (token) {
      config.headers.set("Cookie", `ACCESS_TOKEN=${token}`);
    }
  }
  return config;
};

export const userApi = axios.create({
  baseURL: USER_SERVICE_API_URL,
  withCredentials: true,
  timeout: 5000,
});

export const vehicleApi = axios.create({
  baseURL: VEHICLE_SERVICE_API_URL,
  timeout: 5000,
});

userApi.interceptors.request.use(attachServerCookies);
vehicleApi.interceptors.request.use(attachServerCookies);
