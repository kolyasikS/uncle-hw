import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { DomainExceptionsFilter } from "@/domain/exception-filters/domain-exception.filter";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new DomainExceptionsFilter());

  app.enableCors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(process.env.NESTJS_PORT ?? "3001");
}
bootstrap();
