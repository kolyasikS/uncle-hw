import { Role } from "../../../../domain/constants";
import { RedisService } from "../../../../infrastructure/databases/redis/redis.service";
import { SessionStore } from "../../../auth/domain/interfaces/session-store.interface";
export declare class RedisSessionRepository implements SessionStore {
    readonly redis: RedisService;
    constructor(redis: RedisService);
    set(id: string, role: Role): Promise<void>;
    get(key: string): Promise<unknown>;
    delete(key: string): Promise<void>;
}
