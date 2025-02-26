"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const utils_1 = require("../../utils");
const constants_1 = require("../../constants");
let ToolsService = class ToolsService {
    get uuidToken() {
        return (0, uuid_1.v4)().replace(/-/g, '');
    }
    get getRandomSalt() {
        return (0, utils_1.randomString)((0, utils_1.getRandomNum)(10, 20));
    }
    getReqIP(req) {
        var _a, _b;
        const currentIp = (_b = (_a = (req.headers['x-forwarded-for'] || req.socket.remoteAddress)) === null || _a === void 0 ? void 0 : _a.replace('::ffff:', '')) !== null && _b !== void 0 ? _b : '';
        if (currentIp.split(',').length) {
            return currentIp.split(',').shift();
        }
        else {
            return currentIp;
        }
    }
    makePassword(password, salt) {
        return (0, utils_1.strToMd5)(`${password}_${salt}`);
    }
    generateLoginTokenKey(accountId) {
        return `${constants_1.TOKEN_PREFIX}_${accountId}`;
    }
    generateLoginRefreshTokenKey(accountId) {
        return `${constants_1.TOKEN_REFRESH_PREFIX}_${accountId}`;
    }
};
exports.ToolsService = ToolsService;
exports.ToolsService = ToolsService = __decorate([
    (0, common_1.Injectable)()
], ToolsService);
//# sourceMappingURL=tools.service.js.map