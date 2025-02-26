"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_REFRESH_PREFIX = exports.TOKEN_PREFIX = exports.ADMIN_PREFIX = void 0;
exports.ADMIN_PREFIX = 'admin';
exports.TOKEN_PREFIX = 'account_login_token';
exports.TOKEN_REFRESH_PREFIX = 'account_login_refresh_token';
__exportStar(require("./redis.cache"), exports);
__exportStar(require("./redis.limit"), exports);
__exportStar(require("./reg"), exports);
//# sourceMappingURL=index.js.map