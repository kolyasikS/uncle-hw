import type { EventTypes } from "@/domain/event-types.ts";

export type ApiResponseType<T> = {
  data: T;
  statusCode: number;
  message?: string;
  type?: EventTypes;
};

export class ApiResponse {
  static success<T>({
    data,
    message,
    type,
    statusCode = 200,
  }: {
    data: T;
    message?: string;
    type?: EventTypes;
    statusCode?: number;
  }): ApiResponseType<T> {
    return {
      message,
      statusCode,
      type,
      data,
    };
  }

  static failure({
    message,
    statusCode = 500,
  }: {
    message: string;
    statusCode?: number;
  }): ApiResponseType<null> {
    return {
      message: message,
      statusCode: statusCode,
      data: null,
    };
  }
}
