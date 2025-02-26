"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusMessage = exports.StatusEnum = void 0;
var StatusEnum;
(function (StatusEnum) {
    StatusEnum[StatusEnum["NORMAL"] = 0] = "NORMAL";
    StatusEnum[StatusEnum["FORBIDDEN"] = 1] = "FORBIDDEN";
    StatusEnum[StatusEnum["PENDING"] = 2] = "PENDING";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));
exports.StatusMessage = {
    0: '正常',
    1: '禁用',
};
//# sourceMappingURL=status.enum.js.map