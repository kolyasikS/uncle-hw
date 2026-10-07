import { Inject, Injectable } from "@nestjs/common";
import { METRICS_REPOSITORY } from "@/domain/constants";
import { type MetricsRepository } from "@/modules/metrics/domain/interfaces/metrics.interface";

@Injectable()
export class MetricsService {
  constructor(
    @Inject(METRICS_REPOSITORY)
    private readonly metricsRepository: MetricsRepository,
  ) {}

  getMetrics(): Promise<string> {
    return this.metricsRepository.getMetrics();
  }
}
