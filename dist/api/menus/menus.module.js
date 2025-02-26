"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const constants_1 = require("../../constants");
const account_role_entity_1 = require("../accountRole/entities/account.role.entity");
const resources_entity_1 = require("../resources/entities/resources.entity");
const role_resources_entity_1 = require("../roleResources/entities/role.resources.entity");
const menus_controller_1 = require("./menus.controller");
const menus_repository_1 = require("./menus.repository");
const menus_service_1 = require("./menus.service");
let MenusModule = class MenusModule {
};
exports.MenusModule = MenusModule;
exports.MenusModule = MenusModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: constants_1.ADMIN_PREFIX,
                    module: MenusModule,
                },
            ]),
            typeorm_1.TypeOrmModule.forFeature([resources_entity_1.ResourcesEntity, account_role_entity_1.AccountRoleEntity, role_resources_entity_1.RoleResourcesEntity]),
        ],
        controllers: [menus_controller_1.MenusController],
        providers: [menus_service_1.MenusService, menus_repository_1.MenusRepository],
        exports: [menus_repository_1.MenusRepository],
    })
], MenusModule);
//# sourceMappingURL=menus.module.js.map