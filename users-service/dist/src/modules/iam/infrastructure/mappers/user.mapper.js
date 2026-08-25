"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const user_entity_1 = require("../../../users/domain/domain/entities/user.entity");
class UserMapper {
    static toDomain(prismaUser) {
        return new user_entity_1.User(prismaUser.id, prismaUser.email);
    }
    static toPersistence(user) {
        return {
            email: user.email,
        };
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user.mapper.js.map