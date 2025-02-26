"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleResourcesModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const constants_1 = require("../../constants");
const resources_entity_1 = require("../resources/entities/resources.entity");
const role_resources_entity_1 = require("./entities/role.resources.entity");
const role_resources_controller_1 = require("./role.resources.controller");
const role_resources_service_1 = require("./role.resources.service");
let RoleResourcesModule = class RoleResourcesModule {
};
exports.RoleResourcesModule = RoleResourcesModule;
exports.RoleResourcesModule = RoleResourcesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: constants_1.ADMIN_PREFIX,
                    module: RoleResourcesModule,
                },
            ]),
            typeorm_1.TypeOrmModule.forFeature([role_resources_entity_1.RoleResourcesEntity, resources_entity_1.ResourcesEntity]),
        ],
        controllers: [role_resources_controller_1.RoleResourcesController],
        providers: [role_resources_service_1.RoleResourcesService],
    })
], RoleResourcesModule);
//# sourceMappingURL=role.resources.module.js.map