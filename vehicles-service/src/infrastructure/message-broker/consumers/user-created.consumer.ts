import type { Message } from "amqplib";
import type { UserCreatedHandler } from "@/application/handlers/UserCreatedHandler.js";
import type { UserCreatedEvent } from "@/infrastructure/message-broker/events/user-created.event.js";
import { EVENT_TYPES } from "@/infrastructure/message-broker/events.types.js";
import type { RabbitMQClient } from "../rabbitmq-client.js";

export class UserCreatedConsumer {
  private readonly queueName = "vehicle-service";
  private readonly exchangeName = "domain_events";
  private readonly routingKey = EVENT_TYPES.USER_CREATED;

  constructor(
    private readonly rabbitMQ: RabbitMQClient,
    private readonly handler: UserCreatedHandler,
  ) {}

  async start(): Promise<void> {
    const channel = this.rabbitMQ.getChannel();

    await channel.assertQueue(this.queueName, {
      durable: true,
    });

    await channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);

    await channel.consume(this.queueName, async (message) => {
      if (!message) {
        return;
      }

      await this.processMessage(message);
    });

    console.log(`Listening for ${this.routingKey}`);
  }

  private async processMessage(message: Message): Promise<void> {
    try {
      const event = JSON.parse(message.content.toString()) as UserCreatedEvent;

      console.log("Received user.created:", event);

      await this.handler.handle(event);

      this.rabbitMQ.getChannel().ack(message);
    } catch (error) {
      console.error("Failed to process user.created", error);

      this.rabbitMQ.getChannel().nack(message, false, false);
    }
  }
}
