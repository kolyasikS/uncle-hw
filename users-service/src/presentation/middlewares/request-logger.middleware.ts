import {
  Inject,
  Injectable,
  type LoggerService as NestLoggerService,
  NestMiddleware,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { LOGGER_SERVICE } from "@/domain/constants";

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly redactFields = ["password", "token", "authorization"];

  constructor(
    @Inject(LOGGER_SERVICE) private readonly logger: NestLoggerService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const requestId = crypto.randomUUID();
    const timestamp = Date.now();
    const { method, originalUrl, headers, body, query } = req;

    req["requestId"] = requestId;
    res.setHeader("X-Request-ID", requestId);

    // Sanitize sensitive data
    const safeBody = this.sanitizeData({ ...body });
    const safeHeaders = this.sanitizeData({
      "user-agent": headers["user-agent"],
      "content-type": headers["content-type"],
      "content-length": headers["content-length"],
      host: headers["host"],
      referer: headers["referer"],
    });

    this.logger.log({
      requestId,
      stage: "start",
      method,
      url: originalUrl,
      timestamp,
      headers: safeHeaders,
      query,
      body: safeBody,
      ip: req.headers["x-forwarded-for"] || req.ip || req.socket?.remoteAddress,
    });

    const startHrTime = process.hrtime();

    res.on("finish", () => {
      const durationMs = this.calculateDuration(startHrTime);
      const logLevel = res.statusCode >= 400 ? "warn" : "log";

      this.logger[logLevel]({
        requestId,
        stage: "end",
        statusCode: res.statusCode,
        duration: `${durationMs} ms`,
        method,
        url: originalUrl,
        responseSize: res.getHeader("content-length"),
      });
    });

    res.on("error", (err) => {
      const errorTime = this.calculateDuration(startHrTime);

      this.logger.error({
        requestId,
        stage: "error",
        error: err.message,
        stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
        method,
        url: originalUrl,
        duration: `${errorTime} ms`,
      });
    });

    next();
  }

  private sanitizeData(data: Record<string, any>): Record<string, any> {
    if (!data) return data;

    return Object.entries(data).reduce((acc, [key, value]) => {
      if (this.redactFields.includes(key.toLowerCase())) {
        acc[key] = "****";
      } else if (typeof value === "object") {
        acc[key] = this.sanitizeData(value);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
  }

  private calculateDuration(startHrTime: [number, number]): string {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(startHrTime);
    const durationMs = (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
    return durationMs.toFixed(2);
  }
}
