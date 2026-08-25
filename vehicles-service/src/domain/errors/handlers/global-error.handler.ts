import type { NextFunction, Request, Response } from "express";
import { ApiResponse } from "@/domain/api-response.js";
import { VehicleNotFoundError } from "@/domain/errors/vehicle.errors.js";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof VehicleNotFoundError) {
    return res.status(404).json(
      ApiResponse.failure({
        statusCode: 404,
        message: error.message,
      }),
    );
  }

  console.error("console-error:", error);

  return res.status(500).json(
    ApiResponse.failure({
      statusCode: 500,
      message: "Internal server error",
    }),
  );
}
