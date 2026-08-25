import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";
import { EventBus } from "@/domain/interfaces/event-bus.interface";
import { DomainEvent } from "@/domain/interfaces/message-event.interface";

@Injectable()
export class RabbitMQEventBus implements EventBus {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.amqpConnection.publish(
        "domain_events",
        event.eventName,
        event,
      );
    }
  }
}
