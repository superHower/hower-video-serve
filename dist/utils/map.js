"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToObj = void 0;
const mapToObj = (map) => {
    const obj = {};
    for (const [k, v] of map) {
        obj[k] = v;
    }
    return obj;
};
exports.mapToObj = mapToObj;
//# sourceMappingURL=map.js.map