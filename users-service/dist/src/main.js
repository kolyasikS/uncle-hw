"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const domain_exception_filter_1 = require("./domain/exception-filters/domain-exception.filter");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new domain_exception_filter_1.DomainExceptionsFilter());
    app.enableCors({
        origin: process.env.NESTJS_ALLOWED_ORIGINS,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    });
    app.use((0, cookie_parser_1.default)());
    await app.listen(process.env.NESTJS_PORT ?? "3001");
}
bootstrap();
//# sourceMappingURL=main.js.map