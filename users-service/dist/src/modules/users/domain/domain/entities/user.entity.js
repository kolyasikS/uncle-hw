"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    id;
    email;
    adminId;
    constructor(id, email, adminId) {
        this.id = id;
        this.email = email;
        this.adminId = adminId;
    }
    static create(createUserDto) {
        return new User(crypto.randomUUID(), createUserDto.email, createUserDto.adminId);
    }
    static update(existingUser, updateUserDto) {
        return new User(existingUser.id, updateUserDto.email, existingUser.adminId);
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map