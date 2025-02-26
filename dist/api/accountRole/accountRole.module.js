"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRoleModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const constants_1 = require("../../constants");
const role_entity_1 = require("../role/entities/role.entity");
const accountRole_controller_1 = require("./accountRole.controller");
const accountRole_service_1 = require("./accountRole.service");
const account_role_entity_1 = require("./entities/account.role.entity");
let AccountRoleModule = class AccountRoleModule {
};
exports.AccountRoleModule = AccountRoleModule;
exports.AccountRoleModule = AccountRoleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: constants_1.ADMIN_PREFIX,
                    module: AccountRoleModule,
                },
            ]),
            typeorm_1.TypeOrmModule.forFeature([account_role_entity_1.AccountRoleEntity, role_entity_1.RoleEntity]),
        ],
        controllers: [accountRole_controller_1.AccountRoleController],
        providers: [accountRole_service_1.AccountRoleService],
    })
], AccountRoleModule);
//# sourceMappingURL=accountRole.module.js.map