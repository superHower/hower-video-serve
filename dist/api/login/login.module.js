"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const constants_1 = require("../../constants");
const account_entity_1 = require("../account/entities/account.entity");
const account_role_entity_1 = require("../accountRole/entities/account.role.entity");
const resources_entity_1 = require("../resources/entities/resources.entity");
const role_resources_entity_1 = require("../roleResources/entities/role.resources.entity");
const login_controller_1 = require("./login.controller");
const login_service_1 = require("./login.service");
let LoginModule = class LoginModule {
};
exports.LoginModule = LoginModule;
exports.LoginModule = LoginModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: constants_1.ADMIN_PREFIX,
                    module: LoginModule,
                },
            ]),
            typeorm_1.TypeOrmModule.forFeature([
                account_entity_1.AccountEntity,
                account_role_entity_1.AccountRoleEntity,
                role_resources_entity_1.RoleResourcesEntity,
                resources_entity_1.ResourcesEntity,
            ]),
        ],
        controllers: [login_controller_1.LoginController],
        providers: [login_service_1.LoginService],
    })
], LoginModule);
//# sourceMappingURL=login.module.js.map