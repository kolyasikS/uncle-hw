"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMapper = void 0;
const admin_entity_1 = require("../../domain/entities/admin.entity");
class AdminMapper {
    static toDomain(prismaAdmin) {
        return new admin_entity_1.Admin(prismaAdmin.id, prismaAdmin.email, prismaAdmin.password);
    }
    static toPersistence(admin) {
        return {
            email: admin.email,
            password: admin.password,
        };
    }
    static toHttp(admin) {
        return {
            email: admin.email,
        };
    }
}
exports.AdminMapper = AdminMapper;
//# sourceMappingURL=admin.mapper.js.map