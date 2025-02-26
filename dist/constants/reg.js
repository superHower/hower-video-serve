"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usernameReg = exports.mobileReg = exports.idCardReg = exports.uuidStringReg = exports.dateStringReg = exports.minMoneyReg = exports.dateTimeStringReg = void 0;
exports.dateTimeStringReg = /(((\d{4})-(0[13578]|1[02])-(0[1-9]|[12]\d|3[01]))|((\d{4})-(0[469]|11)-(0[1-9]|[12]\d|30))|((\d{4})-(02)-(0[1-9]|1\d|2[0-8]))|((\d{2}(0[48]|[2468][048]|[13579][26]))-(02)-(29))|(((0[48]|[2468][048]|[13579][26])00)-(02)-(29))) (([01]\d|2[0-3]):([0-5]\d):([0-5]\d))/;
exports.minMoneyReg = /^[1-9](\d+)?(\.\d{2,2})?$/;
exports.dateStringReg = /(((\d{4})-(0[13578]|1[02])-(0[1-9]|[12]\d|3[01]))|((\d{4})-(0[469]|11)-(0[1-9]|[12]\d|30))|((\d{4})-(02)-(0[1-9]|1\d|2[0-8]))|((\d{2}(0[48]|[2468][048]|[13579][26]))-(02)-(29))|(((0[48]|[2468][048]|[13579][26])00)-(02)-(29)))/;
exports.uuidStringReg = /^[0-9a-f]{8}([0-9a-f]{4}){3}[0-9a-f]{12}$/;
exports.idCardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
exports.mobileReg = /^(13[0-9]|14[56789]|15[0-3,5-9]|16[67]|17[1235678]|18[0-9]|19[135689])\d{8}$/;
exports.usernameReg = /^[a-zA-Z.0-9]{4,20}$/;
//# sourceMappingURL=reg.js.map