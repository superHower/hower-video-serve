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
exports.AreaRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const area_entity_1 = require("./entities/area.entity");
let AreaRepository = class AreaRepository {
    constructor(areaRepository) {
        this.areaRepository = areaRepository;
    }
    async getFullAddressByCityId(cityId, address = '') {
        try {
            const result = await this.areaRepository
                .createQueryBuilder('area')
                .select(['area.mergerName'])
                .where('(area.id = :cityId)', { cityId })
                .getOne();
            if (result === null || result === void 0 ? void 0 : result.mergerName) {
                const addressList = result.mergerName.split(',');
                addressList.shift();
                return addressList.join('') + address;
            }
            else {
                throw new common_1.HttpException(`${cityId}在城市表找不到数据`, common_1.HttpStatus.OK);
            }
        }
        catch (e) {
            console.log(e);
            throw new common_1.HttpException('找不到数据', common_1.HttpStatus.OK);
        }
    }
};
exports.AreaRepository = AreaRepository;
exports.AreaRepository = AreaRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(area_entity_1.AreaEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AreaRepository);
//# sourceMappingURL=area.repository.js.map