import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { Global, Module } from "@nestjs/common";
import { RABBITMQ_URL } from "@/domain/constants";
import { RabbitMQClient } from "@/infrastructure/message-broker/rabbitmq/rabbitmq.service";
import { RabbitMQEventBus } from "@/infrastructure/message-broker/rabbitmq/rabbitmq-event-bus.service";

@Global()
@Module({
  controllers: [],
  imports: [
    RabbitMQModule.forRootAsync({
      useFactory: () => ({
        exchanges: [{ name: "domain_events", type: "topic" }],
        uri: RABBITMQ_URL,
        connectionInitOptions: { wait: false },
      }),
    }),
  ],
  providers: [RabbitMQClient, RabbitMQEventBus],
  exports: [RabbitMQClient, RabbitMQEventBus],
})
export class MessageBrokerModule {}
