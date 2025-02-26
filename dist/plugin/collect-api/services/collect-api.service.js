"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CollectApiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectApiService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const collect_1 = require("../constants/collect");
const collect_api_1 = require("../types/collect.api");
let CollectApiService = CollectApiService_1 = class CollectApiService {
    constructor(discoveryService, metadataScanner, reflector) {
        this.discoveryService = discoveryService;
        this.metadataScanner = metadataScanner;
        this.reflector = reflector;
        this.logger = new common_1.Logger(CollectApiService_1.name);
    }
    async allPermissionList() {
        return await this.collectPermission();
    }
    async collectPermission() {
        console.log('开始收集权限');
        const resourceList = [];
        const wrappers = this.discoveryService.getControllers();
        for (const wrapper of wrappers) {
            const { instance } = wrapper;
            if (!instance) {
                return;
            }
            this.metadataScanner.scanFromPrototype(instance, Object.getPrototypeOf(instance), async (key) => {
                const moduleName = Reflect.getMetadata(collect_1.PERMISSION_CLASS, instance.constructor);
                const methodName = this.reflector.get(collect_1.PERMISSION_META, instance[key]);
                const baseUrl = Reflect.getMetadata(collect_api_1.PATH_METADATA, instance.constructor);
                const methodUrl = this.reflector.get(collect_api_1.PATH_METADATA, instance[key]);
                const method = collect_api_1.RequestMethod[this.reflector.get(collect_api_1.METHOD_METADATA, instance[key])];
                let url = baseUrl + '/' + methodUrl;
                url = url
                    .replace('//', '/')
                    .replace(/(.*)?\/$/, '$1')
                    .replace(/\/:.*\w?/, '/*');
                if (moduleName && methodName && method && url) {
                    this.logger.log(`模块名称: ${moduleName}-方法名:${methodName}-请求方式:${method}-路径:${url}`);
                    resourceList.push({
                        moduleName,
                        methodName,
                        method,
                        url,
                    });
                }
            });
        }
        return resourceList;
    }
};
exports.CollectApiService = CollectApiService;
exports.CollectApiService = CollectApiService = CollectApiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.DiscoveryService,
        core_1.MetadataScanner,
        core_1.Reflector])
], CollectApiService);
//# sourceMappingURL=collect-api.service.js.map