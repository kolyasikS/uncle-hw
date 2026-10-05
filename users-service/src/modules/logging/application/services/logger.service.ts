import {
  Inject,
  Injectable,
  LoggerService as NestLoggerService,
} from "@nestjs/common";
import { Logger } from "winston";
import { LOGGER } from "@/domain/constants";

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(@Inject(LOGGER) private readonly logger: Logger) {}

  log(message: string | Record<string, any>, context?: string) {
    this.logger.info({ message, context });
  }

  error(
    message: string | Record<string, any>,
    trace?: string,
    context?: string,
  ) {
    this.logger.error({ message, trace, context });
  }

  warn(message: string | Record<string, any>, context?: string) {
    this.logger.warn({ message, context });
  }

  debug(message: string | Record<string, any>, context?: string) {
    this.logger.debug({ message, context });
  }

  verbose(message: string | Record<string, any>, context?: string) {
    this.logger.verbose({ message, context });
  }
}
