"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const tenant_module_1 = require("./tenant/tenant.module");
const area_module_1 = require("./area/area.module");
const account_module_1 = require("./account/account.module");
const role_module_1 = require("./role/role.module");
const accountRole_module_1 = require("./accountRole/accountRole.module");
const login_module_1 = require("./login/login.module");
const menus_module_1 = require("./menus/menus.module");
const resources_module_1 = require("./resources/resources.module");
const role_resources_module_1 = require("./roleResources/role.resources.module");
const department_module_1 = require("./department/department.module");
const video_module_1 = require("./video/video.module");
const upload_module_1 = require("./upload/upload.module");
let ApiModule = class ApiModule {
};
exports.ApiModule = ApiModule;
exports.ApiModule = ApiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            tenant_module_1.TenantModule,
            area_module_1.AreaModule,
            account_module_1.AccountModule,
            role_module_1.RoleModule,
            accountRole_module_1.AccountRoleModule,
            login_module_1.LoginModule,
            menus_module_1.MenusModule,
            resources_module_1.ResourcesModule,
            role_resources_module_1.RoleResourcesModule,
            department_module_1.DepartmentModule,
            video_module_1.VideoModule,
            upload_module_1.UploadModule,
        ],
    })
], ApiModule);
//# sourceMappingURL=api.module.js.map