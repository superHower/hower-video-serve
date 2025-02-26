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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const resources_type_enum_1 = require("../../enums/resources.type.enum");
const logger_service_1 = require("../../plugin/logger/logger.service");
const redis_service_1 = require("../../plugin/redis/redis.service");
const tools_service_1 = require("../../plugin/tools/tools.service");
const typeorm_2 = require("typeorm");
const account_entity_1 = require("../account/entities/account.entity");
const account_role_entity_1 = require("../accountRole/entities/account.role.entity");
const resources_entity_1 = require("../resources/entities/resources.entity");
const role_resources_entity_1 = require("../roleResources/entities/role.resources.entity");
let LoginService = class LoginService {
    constructor(accountRepository, accountRoleRepository, roleResourcesRepository, resourcesRepository, toolsService, loggerService, redisService, configService) {
        this.accountRepository = accountRepository;
        this.accountRoleRepository = accountRoleRepository;
        this.roleResourcesRepository = roleResourcesRepository;
        this.resourcesRepository = resourcesRepository;
        this.toolsService = toolsService;
        this.loggerService = loggerService;
        this.redisService = redisService;
        this.configService = configService;
    }
    async loginApi(req) {
        const { username, password } = req;
        const accountEntity = await this.queryLoginBuilder
            .where('(account.username = :username)', { username: username })
            .getRawOne();
        if (accountEntity === null || accountEntity === void 0 ? void 0 : accountEntity.id) {
            console.log(accountEntity.password, '111', password);
            const saltPassword = this.toolsService.makePassword(password, accountEntity.salt);
            if (Object.is(saltPassword, accountEntity.password)) {
                return await this.generateToken(accountEntity);
            }
            else {
                throw new common_1.HttpException('账号或密码错误', common_1.HttpStatus.OK);
            }
        }
        else {
            this.loggerService.error('传递的用户名错误');
            throw new common_1.HttpException('账号或密码错误', common_1.HttpStatus.OK);
        }
    }
    async refreshTokenApi(token) {
        const redisData = await this.redisService.get(token);
        if (redisData) {
            const redisDataObj = redisData;
            return await this.generateToken(redisDataObj.userInfo);
        }
        else {
            throw new common_1.HttpException(JSON.stringify({ code: 10025, message: '你还没登录,请先登录' }), common_1.HttpStatus.OK);
        }
    }
    get queryLoginBuilder() {
        return this.accountRepository
            .createQueryBuilder('account')
            .addSelect('account.id', 'id')
            .addSelect('account.username', 'username')
            .addSelect('account.tenantId', 'tenantId')
            .addSelect('account.status', 'status')
            .addSelect('account.accountType', 'accountType')
            .addSelect('account.password', 'password')
            .addSelect('account.salt', 'salt');
    }
    async generateToken(accountEntity) {
        var _a, _b;
        const tokenExpire = (_a = this.configService.get('tokenExpire')) !== null && _a !== void 0 ? _a : 2;
        const refreshTokenExpire = (_b = this.configService.get('refreshTokenExpire')) !== null && _b !== void 0 ? _b : 7;
        const token = this.toolsService.uuidToken;
        const refreshToken = this.toolsService.uuidToken;
        const sign = this.toolsService.uuidToken;
        const accountRoleEntityList = await this.accountRoleRepository.find({
            where: {
                accountId: accountEntity.id,
            },
            select: ['roleId'],
        });
        const roleIdList = accountRoleEntityList.map((item) => item.roleId);
        const roleResourcesList = await this.roleResourcesRepository.find({
            where: {
                type: 1,
                roleId: (0, typeorm_2.In)(roleIdList),
            },
            select: ['resourcesId'],
        });
        const resourcesIdList = roleResourcesList.map((item) => item.resourcesId);
        const resourcesEntity = await this.resourcesRepository.find({
            where: {
                id: (0, typeorm_2.In)(resourcesIdList),
            },
            select: ['url', 'method', 'title', 'resourcesType'],
        });
        console.log(resourcesEntity, '1111');
        const resources = resourcesEntity.filter((item) => item.resourcesType == resources_type_enum_1.ResourcesTypeEnum.API);
        console.log(resources, '全部的资源');
        const redisData = {
            userInfo: accountEntity,
            authApi: resources,
            sign,
        };
        await this.redisService.set(token, redisData, tokenExpire * 60 * 60);
        await this.redisService.set(refreshToken, redisData, refreshTokenExpire * 24 * 60 * 60);
        const accountTokenKey = this.toolsService.generateLoginTokenKey(accountEntity.id);
        const accountRefreshTokenKey = this.toolsService.generateLoginRefreshTokenKey(accountEntity.id);
        const accountToken = (await this.redisService.get(accountTokenKey));
        const accountRefreshToken = (await this.redisService.get(accountRefreshTokenKey));
        console.log(accountToken, accountRefreshToken, '要删除的');
        await this.redisService.del(accountToken);
        await this.redisService.del(accountRefreshToken);
        this.redisService.set(accountTokenKey, token, tokenExpire * 60 * 60);
        this.redisService.set(accountRefreshTokenKey, refreshToken, refreshTokenExpire * 24 * 60 * 60);
        return {
            id: accountEntity.id,
            username: accountEntity.username,
            accountType: accountEntity.accountType,
            token,
            refreshToken,
            sign,
        };
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.AccountEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(account_role_entity_1.AccountRoleEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(role_resources_entity_1.RoleResourcesEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(resources_entity_1.ResourcesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        tools_service_1.ToolsService,
        logger_service_1.LoggerService,
        redis_service_1.RedisService,
        config_1.ConfigService])
], LoginService);
//# sourceMappingURL=login.service.js.map