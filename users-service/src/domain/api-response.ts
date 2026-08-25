import { HttpException, HttpStatus } from "@nestjs/common";
import { EventType } from "@/domain/constants";

export type ApiResponseType<T> = {
  data: T;
  statusCode: number;
  message?: string;
  event?: EventType;
};

export class ApiResponse {
  static success<T>({
    data,
    message,
    event,
    statusCode = 200,
  }: {
    data: T;
    message?: string;
    event?: EventType;
    statusCode?: number;
  }): ApiResponseType<T> {
    return {
      message,
      statusCode,
      event,
      data,
    };
  }

  static failure({
    exception,
  }: {
    exception: HttpException | Error;
  }): ApiResponseType<null> {
    const isHttp = exception instanceof HttpException;

    return {
      message: exception.message,
      statusCode: isHttp
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR,
      data: null,
    };
  }
}
