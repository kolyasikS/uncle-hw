import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { ApiResponse } from "@/domain/api-response";

@Catch()
export class DomainExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = "Internal server error";

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      return response.status(status).json(ApiResponse.failure({ exception }));
    }

    const errorObject =
      exception instanceof Error ? exception : new Error(message);

    // Formats payload using your static failure method
    const payload = ApiResponse.failure({
      exception: errorObject,
    });

    response.status(statusCode).json(payload);
  }
}
