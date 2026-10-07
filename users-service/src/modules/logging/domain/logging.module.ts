import path from "node:path";
import { Module } from "@nestjs/common";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { LOGGER, LOGGER_REPOSITORY, LOGGER_SERVICE } from "@/domain/constants";
import { LoggerService } from "@/modules/logging/application/services/logger.service";
import { WinstonLoggerRepository } from "@/modules/logging/infrastructure/winston.repository";

@Module({
  imports: [],
  providers: [
    {
      provide: LOGGER,
      useFactory: () => {
        const logDir = path.join(process.cwd(), "src/presentation/logs");
        const logger = createLogger({
          level: "info",
          format: format.combine(
            format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            format.printf(({ timestamp, level, message, stack }) => {
              const base = `[${timestamp}] ${level}:`;
              const msg =
                typeof message === "object"
                  ? JSON.stringify(message, null, 2)
                  : message;
              return stack ? `${base} ${msg}\n${stack}` : `${base} ${msg}`;
            }),
          ),
          transports: [
            new transports.Console({
              format: format.colorize({ all: true }),
            }),

            new DailyRotateFile({
              filename: "%DATE%.log",
              datePattern: "YYYY-MM/DD",
              dirname: logDir,
              maxSize: "20m",
              maxFiles: "14d",
              level: "info",
              format: format.json(),
            }),

            new DailyRotateFile({
              filename: "%DATE%-error.log",
              datePattern: "YYYY-MM/DD",
              dirname: logDir,
              maxSize: "20m",
              maxFiles: "30d",
              level: "error",
              format: format.json(),
            }),
          ],
        });
        return logger;
      },
    },
    { provide: LOGGER_REPOSITORY, useClass: WinstonLoggerRepository },
    { provide: LOGGER_SERVICE, useClass: LoggerService },
  ],
  exports: [LOGGER_SERVICE],
})
export class LoggingModule {}
