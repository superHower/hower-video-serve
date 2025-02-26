"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsMinAmountConstraint = void 0;
exports.IsMinAmount = IsMinAmount;
const class_validator_1 = require("class-validator");
const constants_1 = require("../constants");
let IsMinAmountConstraint = class IsMinAmountConstraint {
    async validate(value, _args) {
        if (constants_1.minMoneyReg.test(String(value))) {
            return true;
        }
        else {
            return false;
        }
    }
    defaultMessage() {
        return '提现金额错误,金额为大于或等于1.00元的数字货币形式';
    }
};
exports.IsMinAmountConstraint = IsMinAmountConstraint;
exports.IsMinAmountConstraint = IsMinAmountConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], IsMinAmountConstraint);
function IsMinAmount(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsMinAmountConstraint,
        });
    };
}
//# sourceMappingURL=IsMinAmount.js.map