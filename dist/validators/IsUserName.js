"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserName = exports.IS_USER_NAME = void 0;
exports.IsUserName = IsUserName;
const class_validator_1 = require("class-validator");
const constants_1 = require("../constants");
exports.IS_USER_NAME = 'isUserName';
const isUserName = (value) => {
    return (typeof value === 'string' &&
        (constants_1.usernameReg.test(value) || (0, class_validator_1.isMobilePhone)(value, 'zh-CN') || (0, class_validator_1.isEmail)(value)));
};
exports.isUserName = isUserName;
function IsUserName(validationOptions) {
    return (0, class_validator_1.ValidateBy)({
        name: exports.IS_USER_NAME,
        constraints: [],
        validator: {
            validate: (value) => (0, exports.isUserName)(value),
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property 错误只能是邮箱，手机号码，4-20位的数字或大小写字母或.', validationOptions),
        },
    }, validationOptions);
}
//# sourceMappingURL=IsUserName.js.map