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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitDbService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const account_entity_1 = require("../../api/account/entities/account.entity");
const tenant_entity_1 = require("../../api/tenant/entities/tenant.entity");
const typeorm_2 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const tools_service_1 = require("../../plugin/tools/tools.service");
const account_type_enum_1 = require("../../enums/account.type.enum");
let InitDbService = class InitDbService {
    constructor(accountRepository, tenantRepository, configService, toolsService) {
        this.accountRepository = accountRepository;
        this.tenantRepository = tenantRepository;
        this.configService = configService;
        this.toolsService = toolsService;
    }
    onModuleInit() {
        console.log('初始化数据库');
        this.initData();
    }
    async initData() {
        var _a, _b;
        const total = await this.tenantRepository.count();
        if (total == 0) {
            const tenantData = this.tenantRepository.create({
                name: '总集团',
                username: '张三',
                mobile: '1111',
                expireTime: (0, moment_1.default)()
                    .add(99 * 355, 'day')
                    .format('YYYY-MM-DD HH:mm:ss'),
                description: '总集团',
            });
            await this.tenantRepository.save(tenantData);
            const username = (_a = this.configService.get('defaultAccount')) !== null && _a !== void 0 ? _a : 'admin';
            const defaultPassword = (_b = this.configService.get('defaultPassword')) !== null && _b !== void 0 ? _b : '123456';
            const salt = this.toolsService.getRandomSalt;
            const password = this.toolsService.makePassword(defaultPassword, salt);
            const accountData = this.accountRepository.create({
                username,
                password,
                salt,
                tenantId: tenantData.id,
                accountType: account_type_enum_1.AccountTypeEnum.SUPER_ACCOUNT,
            });
            await this.accountRepository.save(accountData);
        }
    }
};
exports.InitDbService = InitDbService;
exports.InitDbService = InitDbService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.AccountEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(tenant_entity_1.TenantEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService,
        tools_service_1.ToolsService])
], InitDbService);
//# sourceMappingURL=init-db.service.js.map