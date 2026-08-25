export interface SessionStore {
    set(key: string, value: string, ttl?: number): Promise<void>;
    get(key: string): Promise<unknown>;
    delete(key: string): Promise<void>;
}
