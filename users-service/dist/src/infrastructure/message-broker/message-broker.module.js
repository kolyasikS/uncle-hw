"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBrokerModule = void 0;
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../domain/constants");
const rabbitmq_service_1 = require("./rabbitmq/rabbitmq.service");
const rabbitmq_event_bus_service_1 = require("./rabbitmq/rabbitmq-event-bus.service");
let MessageBrokerModule = class MessageBrokerModule {
};
exports.MessageBrokerModule = MessageBrokerModule;
exports.MessageBrokerModule = MessageBrokerModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        controllers: [],
        imports: [
            nestjs_rabbitmq_1.RabbitMQModule.forRootAsync({
                useFactory: () => ({
                    exchanges: [{ name: "domain_events", type: "topic" }],
                    uri: constants_1.RABBITMQ_URL,
                    connectionInitOptions: { wait: false },
                }),
            }),
        ],
        providers: [rabbitmq_service_1.RabbitMQClient, rabbitmq_event_bus_service_1.RabbitMQEventBus],
        exports: [rabbitmq_service_1.RabbitMQClient, rabbitmq_event_bus_service_1.RabbitMQEventBus],
    })
], MessageBrokerModule);
//# sourceMappingURL=message-broker.module.js.map