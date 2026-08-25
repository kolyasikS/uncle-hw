import { type Channel } from "amqplib";
import { QueueMessageClient } from "../../../domain/interfaces/queue-message-client.interface";
export declare class RabbitMQClient implements QueueMessageClient<Channel> {
    private connection?;
    private channel?;
    connect(url: string): Promise<void>;
    getChannel(): Channel;
    disconnect(): Promise<void>;
}
