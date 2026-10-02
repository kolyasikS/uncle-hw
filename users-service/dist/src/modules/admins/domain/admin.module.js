"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../domain/constants");
const create_admin_use_case_1 = require("../application/use-cases/create-admin.use-case");
const get_admin_by_id_use_case_1 = require("../application/use-cases/get-admin-by-id.use-case");
const prisma_admin_repository_1 = require("../infrastructure/repositories/prisma-admin.repository");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        providers: [
            get_admin_by_id_use_case_1.GetAdminByIdUseCase,
            create_admin_use_case_1.CreateAdminUseCase,
            {
                provide: constants_1.ADMIN_REPOSITORY,
                useClass: prisma_admin_repository_1.PrismaAdminRepository,
            },
        ],
        exports: [
            get_admin_by_id_use_case_1.GetAdminByIdUseCase,
            create_admin_use_case_1.CreateAdminUseCase,
            {
                provide: constants_1.ADMIN_REPOSITORY,
                useClass: prisma_admin_repository_1.PrismaAdminRepository,
            },
        ],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map