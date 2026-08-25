import { DynamicModule, Global, Module } from "@nestjs/common";
import { DATABASE_URL_SYMBOL, REDIS_URL_SYMBOL } from "@/domain/constants";
import { PrismaService } from "@/infrastructure/databases/prisma/prisma.service";
import { RedisService } from "@/infrastructure/databases/redis/redis.service";

@Global()
@Module({})
export class DatabaseModule {
  static forRootAsync({
    dbURL,
    redisURL,
  }: {
    dbURL: string;
    redisURL: string;
  }): DynamicModule {
    return {
      module: DatabaseModule,
      controllers: [],
      providers: [
        { provide: DATABASE_URL_SYMBOL, useValue: dbURL },
        { provide: REDIS_URL_SYMBOL, useValue: redisURL },
        PrismaService,
        RedisService,
      ],
      exports: [PrismaService, RedisService],
    };
  }
}
