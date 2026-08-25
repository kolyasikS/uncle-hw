import { EVENT_TYPES } from "@/domain/constants";
import { DomainEvent } from "@/domain/interfaces/message-event.interface";

interface UserCreatedData {
  userId: string;
}
export class UserCreatedEvent implements DomainEvent {
  eventId: string;
  data: UserCreatedData;
  readonly eventName = EVENT_TYPES.USER_CREATED;

  constructor(public readonly userId: string) {
    this.eventId = crypto.randomUUID();
    this.data = {
      userId,
    };
  }
}
