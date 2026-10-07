import {
  Inject,
  Injectable,
  LoggerService as NestLoggerService,
} from "@nestjs/common";
import { LOGGER_REPOSITORY } from "@/domain/constants";
import { type LoggerRepository } from "@/modules/logging/domain/interfaces/logger.interface";

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(
    @Inject(LOGGER_REPOSITORY)
    private readonly loggerRepository: LoggerRepository<
      string | Record<string, any>
    >,
  ) {}

  log(message: string | Record<string, any>, context?: string) {
    this.loggerRepository.log(message, context);
  }

  error(
    message: string | Record<string, any>,
    trace?: string,
    context?: string,
  ) {
    this.loggerRepository.error(message, trace, context);
  }

  warn(message: string | Record<string, any>, context?: string) {
    this.loggerRepository.warn(message, context);
  }

  debug(message: string | Record<string, any>, context?: string) {
    this.loggerRepository.debug(message, context);
  }

  verbose(message: string | Record<string, any>, context?: string) {
    this.loggerRepository.verbose(message, context);
  }
}
