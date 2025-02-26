"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisLimitApi = RedisLimitApi;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const defaultParams = {
    exSecond: 60,
    maxRequest: 3,
};
function RedisLimitApi(params = defaultParams) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(constants_1.REDIS_LIMIT_KEY, true), (0, common_1.SetMetadata)(constants_1.REDIS_LIMIT_RANGE_SECOND_KEY, params.exSecond), (0, common_1.SetMetadata)(constants_1.REDIS_LIMIT_MAX_REQUEST_KEY, params.maxRequest));
}
//# sourceMappingURL=rate-limit-api.decorator.js.map