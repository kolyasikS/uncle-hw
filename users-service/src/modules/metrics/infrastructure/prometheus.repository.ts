import { Inject } from "@nestjs/common";
import * as client from "prom-client";
import { METRICS_REGISTRY } from "@/domain/constants";
import { MetricsRepository } from "@/modules/metrics/domain/interfaces/metrics.interface";

export class PrometheusRepository implements MetricsRepository {
  constructor(
    @Inject(METRICS_REGISTRY) private metricsRegistry: client.Registry,
  ) {}

  getMetrics() {
    return this.metricsRegistry.metrics();
  }
}
