import { Injectable } from "@nestjs/common";
import amqp, { type Channel, type ChannelModel } from "amqplib";
import { QueueMessageClient } from "@/domain/interfaces/queue-message-client.interface";

@Injectable()
export class RabbitMQClient implements QueueMessageClient<Channel> {
  private connection?: ChannelModel;
  private channel?: Channel;

  async connect(url: string) {
    this.connection = await amqp.connect(url);
    this.channel = await this.connection.createChannel();
  }

  getChannel(): Channel {
    if (!this.channel) {
      throw new Error("RabbitMQ is not connected");
    }

    return this.channel;
  }

  async disconnect() {
    await this.channel?.close();
    await this.connection?.close();
  }
}
