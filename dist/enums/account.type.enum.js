"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountTypeMessage = exports.AccountTypeEnum = void 0;
var AccountTypeEnum;
(function (AccountTypeEnum) {
    AccountTypeEnum[AccountTypeEnum["NORMAL_ACCOUNT"] = 0] = "NORMAL_ACCOUNT";
    AccountTypeEnum[AccountTypeEnum["PRIMARY_ACCOUNT"] = 1] = "PRIMARY_ACCOUNT";
    AccountTypeEnum[AccountTypeEnum["SUPER_ACCOUNT"] = 2] = "SUPER_ACCOUNT";
})(AccountTypeEnum || (exports.AccountTypeEnum = AccountTypeEnum = {}));
exports.AccountTypeMessage = {
    0: '普通账号',
    1: '主账号',
    2: '超管',
};
//# sourceMappingURL=account.type.enum.js.map