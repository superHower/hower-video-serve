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
exports.LoggerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../plugin/logger/logger.service");
const operators_1 = require("rxjs/operators");
let LoggerInterceptor = class LoggerInterceptor {
    constructor(logger) {
        this.logger = logger;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.url;
        const now = Date.now();
        const body = request.body;
        const params = request.params;
        const query = request.query;
        const user = request.user;
        return next.handle().pipe((0, operators_1.tap)(() => {
            common_1.Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name);
        }), (0, operators_1.map)((data) => {
            const message = {
                url,
                method,
                user,
                body,
                params,
                query,
            };
            this.logger.info(message, '中间件记录日志');
            return data;
        }));
    }
};
exports.LoggerInterceptor = LoggerInterceptor;
exports.LoggerInterceptor = LoggerInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], LoggerInterceptor);
//# sourceMappingURL=logger.interceptor.js.map