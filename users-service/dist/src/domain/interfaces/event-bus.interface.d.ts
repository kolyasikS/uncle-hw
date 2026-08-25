import { DomainEvent } from "./message-event.interface";
export interface EventBus {
    publish(events: DomainEvent[]): Promise<void>;
}
