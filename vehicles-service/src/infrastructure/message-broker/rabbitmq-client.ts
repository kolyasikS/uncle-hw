import amqp, { type Channel, type ChannelModel } from "amqplib";

export class RabbitMQClient {
  private connection?: ChannelModel;
  private channel?: Channel;

  async connect(url: string): Promise<void> {
    this.connection = await amqp.connect(url);

    this.channel = await this.connection.createChannel();

    await this.channel.assertExchange("domain_events", "topic", {
      durable: true,
    });
  }

  getChannel(): Channel {
    if (!this.channel) {
      throw new Error("RabbitMQ is not connected");
    }

    return this.channel;
  }

  async close(): Promise<void> {
    await this.channel?.close();
    await this.connection?.close();
  }
}
