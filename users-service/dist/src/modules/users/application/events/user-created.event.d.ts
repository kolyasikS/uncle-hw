import { DomainEvent } from "../../../../domain/interfaces/message-event.interface";
interface UserCreatedData {
    userId: string;
}
export declare class UserCreatedEvent implements DomainEvent {
    readonly userId: string;
    eventId: string;
    data: UserCreatedData;
    readonly eventName: "user.created";
    constructor(userId: string);
}
export {};
