"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsIncludes = IsIncludes;
const class_validator_1 = require("class-validator");
function IsIncludes(list, validationOptions) {
    return (0, class_validator_1.ValidateBy)({
        name: 'isIncludes',
        constraints: [list],
        validator: {
            validate: (value) => {
                if (value) {
                    return list.includes(value);
                }
                else {
                    return true;
                }
            },
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property 只能是其中 $constraint1 的一个', validationOptions),
        },
    }, validationOptions);
}
//# sourceMappingURL=IsIncludes.js.map