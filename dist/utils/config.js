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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.IS_DEV = exports.getEnv = void 0;
const yaml_1 = require("yaml");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const getEnv = () => {
    return process.env.RUNNING_ENV;
};
exports.getEnv = getEnv;
exports.IS_DEV = (0, exports.getEnv)() === 'dev';
const getConfig = () => {
    const environment = (0, exports.getEnv)();
    console.log(environment, '当前运行的环境');
    const yamlPath = path.join(process.cwd(), `./application.${environment}.yml`);
    const file = fs.readFileSync(yamlPath, 'utf8');
    const config = (0, yaml_1.parse)(file);
    return config;
};
exports.getConfig = getConfig;
//# sourceMappingURL=config.js.map