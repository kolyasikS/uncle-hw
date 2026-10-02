import type { DomainEvent } from "@/domain/interfaces/message-event.interface.js";
import { EVENT_TYPES } from "@/infrastructure/message-broker/events.types.js";

interface UserCreatedData {
  userId: string;
  adminId: string;
}
export class UserCreatedEvent implements DomainEvent {
  eventId: string;
  data: UserCreatedData;
  readonly eventName = EVENT_TYPES.USER_CREATED;

  constructor(
    public readonly userId: string,
    public readonly adminId: string,
  ) {
    this.eventId = crypto.randomUUID();
    this.data = {
      userId,
      adminId,
    };
  }
}
