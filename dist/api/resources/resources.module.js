"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const constants_1 = require("../../constants");
const account_entity_1 = require("../account/entities/account.entity");
const account_role_entity_1 = require("../accountRole/entities/account.role.entity");
const menus_repository_1 = require("../menus/menus.repository");
const role_resources_entity_1 = require("../roleResources/entities/role.resources.entity");
const resources_entity_1 = require("./entities/resources.entity");
const resources_controller_1 = require("./resources.controller");
const resources_service_1 = require("./resources.service");
let ResourcesModule = class ResourcesModule {
};
exports.ResourcesModule = ResourcesModule;
exports.ResourcesModule = ResourcesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: constants_1.ADMIN_PREFIX,
                    module: ResourcesModule,
                },
            ]),
            typeorm_1.TypeOrmModule.forFeature([
                resources_entity_1.ResourcesEntity,
                account_entity_1.AccountEntity,
                role_resources_entity_1.RoleResourcesEntity,
                account_role_entity_1.AccountRoleEntity,
            ]),
        ],
        controllers: [resources_controller_1.ResourcesController],
        providers: [resources_service_1.ResourcesService, menus_repository_1.MenusRepository],
    })
], ResourcesModule);
//# sourceMappingURL=resources.module.js.map