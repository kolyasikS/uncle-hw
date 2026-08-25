"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQClient = void 0;
const common_1 = require("@nestjs/common");
const amqplib_1 = __importDefault(require("amqplib"));
let RabbitMQClient = class RabbitMQClient {
    connection;
    channel;
    async connect(url) {
        this.connection = await amqplib_1.default.connect(url);
        this.channel = await this.connection.createChannel();
    }
    getChannel() {
        if (!this.channel) {
            throw new Error("RabbitMQ is not connected");
        }
        return this.channel;
    }
    async disconnect() {
        await this.channel?.close();
        await this.connection?.close();
    }
};
exports.RabbitMQClient = RabbitMQClient;
exports.RabbitMQClient = RabbitMQClient = __decorate([
    (0, common_1.Injectable)()
], RabbitMQClient);
//# sourceMappingURL=rabbitmq.service.js.map