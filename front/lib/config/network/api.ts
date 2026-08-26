import axios from "axios";
import { USER_SERVICE_API_URL, VEHICLE_SERVICE_API_URL } from "@/lib/constants";

export const userApi = axios.create({
  baseURL: USER_SERVICE_API_URL,
  withCredentials: true,
  timeout: 5000,
});

export const vehicleApi = axios.create({
  baseURL: VEHICLE_SERVICE_API_URL,
  timeout: 5000,
});
