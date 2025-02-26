"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpToAddressService = void 0;
const common_1 = require("@nestjs/common");
const main_1 = require("../../main");
const axios_1 = __importDefault(require("axios"));
let IpToAddressService = class IpToAddressService {
    async getAddress(ip) {
        const lbsKey = main_1.config.lbsKey;
        console.log(lbsKey, '密钥');
        const url = `https://apis.map.qq.com/ws/location/v1/ip?key=${lbsKey}&ip=${ip}`;
        const { data } = await axios_1.default.get(url);
        if (data.status === 0) {
            const { result: { ad_info }, } = data || {};
            return {
                nation: ad_info.nation,
                province: ad_info.province,
                city: ad_info.city,
                district: ad_info.district,
                adcode: ad_info.adcode,
            };
        }
        else {
            return {
                nation: '',
                province: '',
                city: '',
                district: '',
                adcode: '',
            };
        }
    }
};
exports.IpToAddressService = IpToAddressService;
exports.IpToAddressService = IpToAddressService = __decorate([
    (0, common_1.Injectable)()
], IpToAddressService);
//# sourceMappingURL=ip-to-address.service.js.map