import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import {
  makeCounterProvider,
  makeHistogramProvider,
  PrometheusModule,
} from "@willsoto/nestjs-prometheus";
import * as client from "prom-client";
import { METRICS_REGISTRY, METRICS_REPOSITORY } from "@/domain/constants";
import { HttpMetricsInterceptor } from "@/domain/interceptors/http-metrics.interceptor";
import { MetricsService } from "@/modules/metrics/application/services/metrics.service";
import { PrometheusRepository } from "@/modules/metrics/infrastructure/prometheus.repository";
import { MetricsController } from "@/modules/metrics/presentation/metrics.controller";

@Module({
  controllers: [MetricsController],
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true, // event loop lag, heap, GC, CPU, handles
        config: { prefix: "myapp_" },
      },
      defaultLabels: {
        service: process.env.SERVICE_NAME ?? "my-service",
        env: process.env.NODE_ENV ?? "development",
      },
    }),
  ],
  providers: [
    MetricsService,
    makeHistogramProvider({
      name: "http_request_duration_seconds",
      help: "HTTP request duration in seconds",
      labelNames: ["method", "route", "status_code"],
      buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
    }),
    makeCounterProvider({
      name: "http_requests_total",
      help: "Total HTTP requests",
      labelNames: ["method", "route", "status_code"],
    }),
    { provide: METRICS_REPOSITORY, useClass: PrometheusRepository },
    {
      provide: METRICS_REGISTRY,
      useFactory: () => {
        return client.register;
      },
    },
    { provide: APP_INTERCEPTOR, useClass: HttpMetricsInterceptor },
  ],
  exports: [MetricsService],
})
export class MetricsModule {}
