"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiInterceptor = void 0;
const common_1 = require("@nestjs/common");
const account_type_enum_1 = require("../enums/account.type.enum");
let ApiInterceptor = class ApiInterceptor {
    constructor() {
        this.whiteUrlList = ['/menus/btnList', '/menus', '/uploads'];
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.url;
        const isWhiteListed = this.whiteUrlList.some((whiteUrl) => url.startsWith(whiteUrl));
        if (isWhiteListed) {
            return next.handle();
        }
        const user = request.user;
        const newUrl = url
            .replace('//', '/')
            .replace('/api/v1/admin', '')
            .replace(/\?.*/, '')
            .replace(/(\d+)$/, '*');
        console.log(newUrl, '-------------', method);
        if (user) {
            const { userInfo: { accountType }, } = user;
            if (accountType == account_type_enum_1.AccountTypeEnum.SUPER_ACCOUNT) {
                return next.handle();
            }
            console.log('用户', user.authApi);
            const currentItem = user.authApi.find((item) => item.method == method && item.url == newUrl);
            console.log(currentItem, '???');
            if (currentItem) {
                return next.handle();
            }
            else {
                throw new common_1.HttpException(JSON.stringify({ code: 10034, message: '你没权限访问' }), common_1.HttpStatus.OK);
            }
        }
        return next.handle();
    }
};
exports.ApiInterceptor = ApiInterceptor;
exports.ApiInterceptor = ApiInterceptor = __decorate([
    (0, common_1.Injectable)()
], ApiInterceptor);
//# sourceMappingURL=api.interceptor.js.map