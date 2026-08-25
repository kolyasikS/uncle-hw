import { randomUUID } from "node:crypto";
import { Inject, Injectable } from "@nestjs/common";
import { SESSION_STORE, SESSION_TTL } from "@/domain/constants";
import { Session } from "@/modules/auth/domain/interfaces/session.interface";
import { type SessionStore } from "@/modules/auth/domain/interfaces/session-store.interface";

@Injectable()
export class SessionService {
  constructor(
    @Inject(SESSION_STORE) private readonly sessionStore: SessionStore,
  ) {}

  async create(key: string, id: string): Promise<string> {
    const sessionId = randomUUID();

    await this.sessionStore.set(
      `${key}:${sessionId}`,
      JSON.stringify({
        id,
      } satisfies Session),
      SESSION_TTL,
    );

    return sessionId;
  }

  async get(key: string, sessionId: string): Promise<Session | null> {
    const value = (await this.sessionStore.get(
      `${key}:${sessionId}`,
    )) as string;

    if (!value) {
      return null;
    }

    return JSON.parse(value) satisfies Session;
  }

  async delete(sessionId: string) {
    await this.sessionStore.delete(`admin:session:${sessionId}`);
  }
}
