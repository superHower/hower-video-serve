"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheApi = RedisCacheApi;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const defaultParams = {
    exSecond: 60,
    isDiffUser: false,
};
function RedisCacheApi(params = defaultParams) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(constants_1.REDIS_CACHE_KEY, true), (0, common_1.SetMetadata)(constants_1.REDIS_CACHE_EX_SECOND_KEY, params.exSecond), (0, common_1.SetMetadata)(constants_1.REDIS_CACHE_EX_DIFF_USER_KEY, params.isDiffUser));
}
//# sourceMappingURL=redis-cache-api.decorator.js.map