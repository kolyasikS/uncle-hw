export interface DomainEvent {
    eventId: string;
    eventName: string;
    data: unknown;
}
