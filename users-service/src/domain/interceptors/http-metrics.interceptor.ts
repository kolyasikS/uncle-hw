// http-metrics.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { InjectMetric } from "@willsoto/nestjs-prometheus";
import { Counter, Histogram } from "prom-client";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
  constructor(
    @InjectMetric("http_request_duration_seconds")
    private readonly duration: Histogram<string>,
    @InjectMetric("http_requests_total")
    private readonly total: Counter<string>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== "http") return next.handle();

    const http = context.switchToHttp();
    const req = http.getRequest();
    const res = http.getResponse();
    const end = this.duration.startTimer();

    const record = () => {
      // Express: req.route.path. Fastify: req.routeOptions?.url
      const route = req.route?.path
        ? `${req.baseUrl ?? ""}${req.route.path}`
        : (req.routeOptions?.url ?? "unmatched");
      const labels = {
        method: req.method,
        route,
        status_code: String(res.statusCode),
      };
      end(labels);
      this.total.inc(labels);
    };

    return next.handle().pipe(
      tap({
        next: record,
        error: record, // status code is set by the exception filter by then
      }),
    );
  }
}
