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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const path = __importStar(require("path"));
const common_1 = require("@nestjs/common");
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const utils_1 = require("../../utils");
const transportsHandler = () => {
    const transportsList = [
        new winston_daily_rotate_file_1.default({
            filename: path.join(process.cwd(), 'logs', 'error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error',
        }),
        new winston_daily_rotate_file_1.default({
            filename: path.join(process.cwd(), 'logs', 'info-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            handleExceptions: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'silly',
        }),
    ];
    if (utils_1.IS_DEV) {
        transportsList.push(new winston_1.default.transports.Console({}));
    }
    return transportsList;
};
let LoggerService = class LoggerService {
    constructor() {
        this.logger = winston_1.default.createLogger({
            level: utils_1.IS_DEV ? 'silly' : 'info',
            format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), winston_1.default.format.colorize(), winston_1.default.format.printf(({ prefix, timestamp, message, level }) => {
                return `[${timestamp}]-【${level}】-${prefix ? `-【${prefix}】` : ''} ${message}`;
            })),
            transports: transportsHandler(),
        });
    }
    error(message, prefix = '') {
        this.logger.error(this.toString(message), { prefix });
    }
    warn(message, prefix = '') {
        this.logger.warn(this.toString(message), { prefix });
    }
    info(message, prefix = '') {
        this.logger.info(this.toString(message), { prefix });
    }
    http(message, prefix = '') {
        this.logger.http(this.toString(message), { prefix });
    }
    verbose(message, prefix = '') {
        this.logger.verbose(this.toString(message), { prefix });
    }
    debug(message, prefix = '') {
        this.logger.debug(this.toString(message), { prefix });
    }
    silly(message, prefix = '') {
        this.logger.silly(this.toString(message), { prefix });
    }
    toString(message) {
        if (typeof message !== 'string') {
            return JSON.stringify(message, null, 2);
        }
        else {
            return message;
        }
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoggerService);
//# sourceMappingURL=logger.service.js.map