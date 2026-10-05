import { Module } from "@nestjs/common";
import { LOGGER, LOGGER_SERVICE } from "@/domain/constants";
import { LoggerService } from "@/modules/logging/application/services/logger.service";
import { logger } from "@/modules/logging/infrastructure/winston.logger";

@Module({
  imports: [],
  providers: [
    {
      provide: LOGGER,
      useValue: logger,
    },
    { provide: LOGGER_SERVICE, useClass: LoggerService },
  ],
  exports: [LOGGER_SERVICE],
})
export class LoggingModule {}
