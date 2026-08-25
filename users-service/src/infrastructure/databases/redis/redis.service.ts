import { Inject, Injectable, OnModuleDestroy } from "@nestjs/common";
import Redis from "ioredis";
import { REDIS_URL_SYMBOL } from "@/domain/constants";

@Injectable()
export class RedisService implements OnModuleDestroy {
  readonly redis: Redis;

  constructor(@Inject(REDIS_URL_SYMBOL) private readonly url: string) {
    this.redis = new Redis(url);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.redis.set(key, value, "EX", ttl);
      return;
    }

    await this.redis.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redis.exists(key);

    return result === 1;
  }

  async expire(key: string, seconds: number): Promise<void> {
    await this.redis.expire(key, seconds);
  }

  async onModuleDestroy(): Promise<void> {
    await this.redis.quit();
  }
}
