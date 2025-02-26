"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const constants_1 = require("../../constants");
const account_entity_1 = require("../account/entities/account.entity");
const area_entity_1 = require("../area/entities/area.entity");
const tenant_entity_1 = require("./entities/tenant.entity");
const tenant_controller_1 = require("./tenant.controller");
const tenant_service_1 = require("./tenant.service");
let TenantModule = class TenantModule {
};
exports.TenantModule = TenantModule;
exports.TenantModule = TenantModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: constants_1.ADMIN_PREFIX,
                    module: TenantModule,
                },
            ]),
            typeorm_1.TypeOrmModule.forFeature([tenant_entity_1.TenantEntity, area_entity_1.AreaEntity, account_entity_1.AccountEntity]),
        ],
        providers: [tenant_service_1.TenantService],
        controllers: [tenant_controller_1.TenantController],
    })
], TenantModule);
//# sourceMappingURL=tenant.module.js.map