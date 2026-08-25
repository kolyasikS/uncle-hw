import { DomainEvent } from "@/domain/interfaces/message-event.interface";

export interface EventBus {
  publish(events: DomainEvent[]): Promise<void>;
}
