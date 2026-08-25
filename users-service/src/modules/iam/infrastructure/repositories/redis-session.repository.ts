import { Injectable } from "@nestjs/common";
import { Role, SESSION_TTL } from "@/domain/constants";
import { RedisService } from "@/infrastructure/databases/redis/redis.service";
import { SessionStore } from "@/modules/auth/domain/interfaces/session-store.interface";

@Injectable()
export class RedisSessionRepository implements SessionStore {
  constructor(readonly redis: RedisService) {}
  async set(id: string, role: Role): Promise<void> {
    await this.redis.set(id, role, SESSION_TTL);
  }

  async get(key: string): Promise<unknown> {
    return await this.redis.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.redis.delete(key);
  }
}
