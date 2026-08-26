import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function retrieveErrorMessage(error: Error): string | null {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message;
  } else {
    return null;
  }
}
