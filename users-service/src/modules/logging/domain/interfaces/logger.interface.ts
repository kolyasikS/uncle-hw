/** biome-ignore-all lint/suspicious/noExplicitAny: Could be used different loggers with different parameters */
export interface LoggerRepository<M> {
  log(message: M, ...optionalParams: unknown[]): void;
  error(message: M, ...optionalParams: unknown[]): void;
  warn(message: M, ...optionalParams: unknown[]): void;
  debug(message: M, ...optionalParams: unknown[]): void;
  verbose(message: M, ...optionalParams: unknown[]): void;
}
