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
exports.AreaService = void 0;
const common_1 = require("@nestjs/common");
const area_entity_1 = require("./entities/area.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AreaService = class AreaService {
    constructor(areaRepository) {
        this.areaRepository = areaRepository;
    }
    async getDataByPidApi(pid) {
        pid = pid ? pid : 0;
        return await this.areaRepository
            .createQueryBuilder('area')
            .select(['area.id', 'area.name'])
            .where('(area.pid=:pid)', { pid })
            .getMany();
    }
    async getAllCityApi() {
        return await this.areaRepository
            .createQueryBuilder('area')
            .select(['area.id', 'area.name', 'area.shortname', 'area.pinyin'])
            .andWhere('area.level=2')
            .orderBy({ 'area.pinyin': 'ASC' })
            .getMany();
    }
};
exports.AreaService = AreaService;
exports.AreaService = AreaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(area_entity_1.AreaEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AreaService);
//# sourceMappingURL=area.service.js.map