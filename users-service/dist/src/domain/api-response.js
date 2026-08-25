"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
const common_1 = require("@nestjs/common");
class ApiResponse {
    static success({ data, message, event, statusCode = 200, }) {
        return {
            message,
            statusCode,
            event,
            data,
        };
    }
    static failure({ exception, }) {
        const isHttp = exception instanceof common_1.HttpException;
        return {
            message: exception.message,
            statusCode: isHttp
                ? exception.getStatus()
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            data: null,
        };
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=api-response.js.map