"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    id;
    email;
    constructor(id, email) {
        this.id = id;
        this.email = email;
    }
    static create(createUserDto) {
        return new User(crypto.randomUUID(), createUserDto.email);
    }
    static update(existingUser, updateUserDto) {
        return new User(existingUser.id, updateUserDto.email);
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map