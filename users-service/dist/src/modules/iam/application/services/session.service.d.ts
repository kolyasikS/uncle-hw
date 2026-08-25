import { Session } from "../../../auth/domain/interfaces/session.interface";
import { type SessionStore } from "../../../auth/domain/interfaces/session-store.interface";
export declare class SessionService {
    private readonly sessionStore;
    constructor(sessionStore: SessionStore);
    create(key: string, id: string): Promise<string>;
    get(key: string, sessionId: string): Promise<Session | null>;
    delete(sessionId: string): Promise<void>;
}
