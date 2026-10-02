"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const utils_1 = require("../../../../domain/utils");
class Admin {
    id;
    email;
    password;
    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
    static async create(createUserDto) {
        return new Admin(crypto.randomUUID(), createUserDto.email, await (0, utils_1.hashPassword)(createUserDto.password));
    }
}
exports.Admin = Admin;
//# sourceMappingURL=admin.entity.js.map