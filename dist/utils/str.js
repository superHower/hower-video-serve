"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strToMd5 = exports.randomString = exports.getRandomNum = void 0;
const crypto_1 = __importDefault(require("crypto"));
const getRandomNum = (min, max) => {
    return Math.floor(min + Math.random() * (max - min));
};
exports.getRandomNum = getRandomNum;
const randomString = (length) => {
    return crypto_1.default.randomBytes(length).toString('hex').slice(0, length);
};
exports.randomString = randomString;
const strToMd5 = (str) => {
    const md5 = crypto_1.default.createHash('md5');
    return md5.update(str).digest('hex');
};
exports.strToMd5 = strToMd5;
//# sourceMappingURL=str.js.map