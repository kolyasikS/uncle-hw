import { MiddlewareConsumer, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DATABASE_URL, JWT_SECRET, REDIS_URL } from "@/domain/constants";
import { RequestLoggerMiddleware } from "@/domain/middlewares/request-logger.middleware";
import { DatabaseModule } from "@/infrastructure/databases/database.module";
import { AuthModule } from "@/modules/auth/domain/auth.module";
import { LoggingModule } from "@/modules/logging/domain/logging.module";
import { MetricsModule } from "@/modules/metrics/domain/metrics.module";
import { UserModule } from "@/modules/users/domain/domain/user.module";

@Module({
  imports: [
    DatabaseModule.forRootAsync({ dbURL: DATABASE_URL, redisURL: REDIS_URL }),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: "15m",
      },
    }),
    AuthModule,
    UserModule,
    LoggingModule,
    MetricsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes("*");
  }
}
