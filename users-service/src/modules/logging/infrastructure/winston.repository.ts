import { Inject } from "@nestjs/common";
import { Logger } from "winston";
import { LOGGER } from "@/domain/constants";
import { LoggerRepository } from "@/modules/logging/domain/interfaces/logger.interface";

export class WinstonLoggerRepository<M> implements LoggerRepository<M> {
  constructor(@Inject(LOGGER) private logger: Logger) {}

  log(message: M, context?: string) {
    this.logger.info({ message, context });
  }

  error(message: M, trace?: string, context?: string) {
    this.logger.error({ message, trace, context });
  }

  warn(message: M, context?: string) {
    this.logger.warn({ message, context });
  }

  debug(message: M, context?: string) {
    this.logger.debug({ message, context });
  }

  verbose(message: M, context?: string) {
    this.logger.verbose({ message, context });
  }
}
