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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../plugin/redis/redis.service");
const utils_1 = require("../utils");
let AuthGuard = class AuthGuard {
    constructor(redisService) {
        this.redisService = redisService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = context.switchToRpc().getData().headers.token ||
            context.switchToHttp().getRequest().body.token ||
            (0, utils_1.getUrlQuery)(request.url, 'token');
        console.log(token, '当前token----', request.url);
        if (request.url == '/api/v1/admin/account') {
            return true;
        }
        if (token) {
            const result = await this.redisService.get(token);
            if (result) {
                request.user = result;
                return true;
            }
            else {
                throw new common_1.HttpException(JSON.stringify({ code: 10024, message: '你还没登录,请先登录' }), common_1.HttpStatus.OK);
            }
        }
        else {
            throw new common_1.HttpException(JSON.stringify({ code: 10024, message: '你还没登录,请先登录' }), common_1.HttpStatus.OK);
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map