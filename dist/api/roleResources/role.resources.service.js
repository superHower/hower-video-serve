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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleResourcesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const utils_1 = require("../../utils");
const typeorm_2 = require("typeorm");
const resources_entity_1 = require("../resources/entities/resources.entity");
const role_resources_entity_1 = require("./entities/role.resources.entity");
let RoleResourcesService = class RoleResourcesService {
    constructor(roleResourcesRepository, resourcesRepository, dataSource) {
        this.roleResourcesRepository = roleResourcesRepository;
        this.resourcesRepository = resourcesRepository;
        this.dataSource = dataSource;
    }
    async dispatchResourcesApi(req) {
        const { roleId, type } = req;
        if (!req.resourceList.length) {
            await this.roleResourcesRepository.delete({ roleId, type });
            return '分配资源成功';
        }
        const roleResourcesEntity = await this.roleResourcesRepository.find({
            where: { roleId, type },
            select: ['resourcesId'],
        });
        if (roleResourcesEntity.length) {
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                const oldResourceIdList = roleResourcesEntity.map((item) => item.resourcesId);
                const roleResourceList = (0, utils_1.getJ)(oldResourceIdList, req.resourceList);
                const roleResourceDeleteList = (0, utils_1.getC)(roleResourceList, oldResourceIdList);
                if (roleResourceDeleteList.length) {
                    const roleResourcesEntity1 = await this.roleResourcesRepository.find({
                        where: {
                            roleId: req.roleId,
                            resourcesId: (0, typeorm_2.In)(roleResourceDeleteList),
                            type,
                        },
                        select: ['id'],
                    });
                    await queryRunner.manager.delete(role_resources_entity_1.RoleResourcesEntity, roleResourcesEntity1.map((item) => item.id));
                }
                const createRoleResourceList = (0, utils_1.getC)(roleResourceList, req.resourceList);
                if (createRoleResourceList.length) {
                    const createRoleResourcesData = createRoleResourceList.map((item) => {
                        return {
                            resourcesId: item,
                            roleId: req.roleId,
                            type,
                        };
                    });
                    const data = queryRunner.manager.create(role_resources_entity_1.RoleResourcesEntity, createRoleResourcesData);
                    await queryRunner.manager.save(data);
                }
                await queryRunner.commitTransaction();
                return '分配资源成功';
            }
            catch (err) {
                await queryRunner.rollbackTransaction();
                throw new common_1.HttpException('分配资源失败', common_1.HttpStatus.OK);
            }
            finally {
                await queryRunner.release();
            }
        }
        else {
            const data = req.resourceList.map((item) => {
                return {
                    roleId: req.roleId,
                    resourcesId: item,
                    type,
                };
            });
            const data1 = this.roleResourcesRepository.create(data);
            await this.roleResourcesRepository.save(data1);
            return '分配资源成功';
        }
    }
    async getResourceByRoleIdApi(roleId, type) {
        const roleResourcesEntity = await this.roleResourcesRepository.find({
            where: { roleId, type },
            select: ['resourcesId'],
        });
        const resourceIdList = roleResourcesEntity.map((item) => item.resourcesId);
        return await this.resourcesRepository.find({ where: { id: (0, typeorm_2.In)(resourceIdList) } });
    }
};
exports.RoleResourcesService = RoleResourcesService;
exports.RoleResourcesService = RoleResourcesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_resources_entity_1.RoleResourcesEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(resources_entity_1.ResourcesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], RoleResourcesService);
//# sourceMappingURL=role.resources.service.js.map