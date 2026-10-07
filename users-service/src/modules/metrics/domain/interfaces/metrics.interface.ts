export interface MetricsRepository {
  getMetrics(): Promise<string>;
}
