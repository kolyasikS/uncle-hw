"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreatedEvent = void 0;
const constants_1 = require("../../../../domain/constants");
class UserCreatedEvent {
    eventId;
    data;
    eventName = constants_1.EVENT_TYPES.USER_CREATED;
    constructor(userId, adminId) {
        this.eventId = crypto.randomUUID();
        this.data = {
            userId,
            adminId,
        };
    }
}
exports.UserCreatedEvent = UserCreatedEvent;
//# sourceMappingURL=user-created.event.js.map