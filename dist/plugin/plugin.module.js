"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginModule = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("./logger/logger.service");
const tools_service_1 = require("./tools/tools.service");
const redis_service_1 = require("./redis/redis.service");
const collect_api_module_1 = require("./collect-api/collect-api.module");
const ip_to_address_service_1 = require("./ip-to-address/ip-to-address.service");
const upload_oss_service_1 = require("./file/upload-oss.service");
let PluginModule = class PluginModule {
};
exports.PluginModule = PluginModule;
exports.PluginModule = PluginModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [logger_service_1.LoggerService, tools_service_1.ToolsService, redis_service_1.RedisService, ip_to_address_service_1.IpToAddressService, upload_oss_service_1.UploadOssService],
        exports: [logger_service_1.LoggerService, tools_service_1.ToolsService, redis_service_1.RedisService, ip_to_address_service_1.IpToAddressService, upload_oss_service_1.UploadOssService],
        imports: [collect_api_module_1.CollectApiModule],
    })
], PluginModule);
//# sourceMappingURL=plugin.module.js.map