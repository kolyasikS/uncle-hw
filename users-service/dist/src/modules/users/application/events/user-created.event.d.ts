import { DomainEvent } from "../../../../domain/interfaces/message-event.interface";
interface UserCreatedData {
    userId: string;
    adminId: string;
}
export declare class UserCreatedEvent implements DomainEvent {
    eventId: string;
    data: UserCreatedData;
    readonly eventName: "user.created";
    constructor(userId: string, adminId: string);
}
export {};
