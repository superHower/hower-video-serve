"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDateFormateString = exports.IS_DATE_FORMAT_STRING = void 0;
exports.IsDateFormateString = IsDateFormateString;
const class_validator_1 = require("class-validator");
const constants_1 = require("../constants");
exports.IS_DATE_FORMAT_STRING = 'isDateFormateString';
const isDateFormateString = (value) => {
    return typeof value === 'string' && constants_1.dateStringReg.test(value);
};
exports.isDateFormateString = isDateFormateString;
function IsDateFormateString(validationOptions) {
    return (0, class_validator_1.ValidateBy)({
        name: exports.IS_DATE_FORMAT_STRING,
        constraints: [],
        validator: {
            validate: (value) => (0, exports.isDateFormateString)(value),
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property 格式必须为:YYYY-MM-DD HH:mm:ss', validationOptions),
        },
    }, validationOptions);
}
//# sourceMappingURL=IsDateFormatString.js.map