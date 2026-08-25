import "dotenv";
import { RabbitMQClient } from "@/infrastructure/message-broker/rabbitmq-client.js";

export const rabbitMQ = new RabbitMQClient();
export async function connectRabbitMQ() {
  await rabbitMQ.connect(process.env.RABBITMQ_URL ?? "");
}
