import { OnModuleDestroy } from "@nestjs/common";
import Redis from "ioredis";
export declare class RedisService implements OnModuleDestroy {
    private readonly url;
    readonly redis: Redis;
    constructor(url: string);
    set(key: string, value: string, ttl?: number): Promise<void>;
    get(key: string): Promise<string | null>;
    delete(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    expire(key: string, seconds: number): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
