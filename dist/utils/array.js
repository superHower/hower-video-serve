"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getC = exports.getJ = exports.getB = void 0;
const getB = (list1, list2) => {
    return [...list1, ...list2];
};
exports.getB = getB;
const getJ = (list1, list2) => {
    if (list1.length > list2.length) {
        return list1.filter((item) => list2.includes(item));
    }
    else {
        return list2.filter((item) => list1.includes(item));
    }
};
exports.getJ = getJ;
const getC = (list1, list2) => {
    if (list1.length > list2.length) {
        return list1.filter((item) => !list2.includes(item));
    }
    else {
        return list2.filter((item) => !list1.includes(item));
    }
};
exports.getC = getC;
//# sourceMappingURL=array.js.map