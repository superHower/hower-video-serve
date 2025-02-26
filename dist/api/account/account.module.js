"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const constants_1 = require("../../constants");
const department_entity_1 = require("../department/entities/department.entity");
const tenant_entity_1 = require("../tenant/entities/tenant.entity");
const account_controller_1 = require("./account.controller");
const account_service_1 = require("./account.service");
const account_entity_1 = require("./entities/account.entity");
let AccountModule = class AccountModule {
};
exports.AccountModule = AccountModule;
exports.AccountModule = AccountModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: constants_1.ADMIN_PREFIX,
                    module: AccountModule,
                },
            ]),
            typeorm_1.TypeOrmModule.forFeature([account_entity_1.AccountEntity, tenant_entity_1.TenantEntity, department_entity_1.DepartmentEntity]),
        ],
        controllers: [account_controller_1.AccountController],
        providers: [account_service_1.AccountService],
    })
], AccountModule);
//# sourceMappingURL=account.module.js.map