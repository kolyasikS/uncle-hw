import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { EventBus } from "../../../domain/interfaces/event-bus.interface";
import { DomainEvent } from "../../../domain/interfaces/message-event.interface";
export declare class RabbitMQEventBus implements EventBus {
    private readonly amqpConnection;
    constructor(amqpConnection: AmqpConnection);
    publish(events: DomainEvent[]): Promise<void>;
}
