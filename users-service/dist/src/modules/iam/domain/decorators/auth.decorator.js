"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = Session;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../domain/constants");
const auth_guard_1 = require("../guards/auth.guard");
function Session(role) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(constants_1.SESSION_ROLE_KEY, role), (0, common_1.UseGuards)(auth_guard_1.AuthGuard));
}
//# sourceMappingURL=auth.decorator.js.map