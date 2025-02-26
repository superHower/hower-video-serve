"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUUID = exports.isString = exports.isValidArrayIndex = exports.isRegExp = exports.isObject = void 0;
const toString = Object.prototype.toString;
const isObject = (obj) => {
    return Object.is(toString.call(obj), '[object Object]');
};
exports.isObject = isObject;
const isRegExp = (v) => {
    return Object.is(toString.call(v), '[object RegExp]');
};
exports.isRegExp = isRegExp;
const isValidArrayIndex = (val) => {
    const n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val);
};
exports.isValidArrayIndex = isValidArrayIndex;
const isString = (str) => {
    return Object.is(toString.call(str), '[object String]');
};
exports.isString = isString;
const isUUID = (str) => {
    return /\w{8}(-\w{4}){3}-\w{12}/.test(str);
};
exports.isUUID = isUUID;
//# sourceMappingURL=data-type.js.map