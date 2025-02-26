"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
const utils_1 = require("../../utils");
let RedisService = class RedisService {
    onModuleInit() {
        if (!this.redisClient) {
            this.getClient();
        }
    }
    getClient() {
        this.redisClient = new ioredis_1.default({
            port: 6379,
            host: 'localhost',
            username: '',
            password: '',
            db: 0,
        });
    }
    async set(key, value, second) {
        value = (0, utils_1.isObject)(value) ? JSON.stringify(value) : value;
        if (!second) {
            return await this.redisClient.set(key, value);
        }
        else {
            return await this.redisClient.set(key, value, 'EX', second);
        }
    }
    async incr(key) {
        return await this.redisClient.incr(key);
    }
    async get(key) {
        try {
            const data = await this.redisClient.get(key);
            if (data) {
                return JSON.parse(data);
            }
            else {
                return null;
            }
        }
        catch (e) {
            return await this.redisClient.get(key);
        }
    }
    async del(key) {
        return await this.redisClient.del(key);
    }
    async hset(key, field) {
        return await this.redisClient.hset(key, field);
    }
    async hget(key, field) {
        return await this.redisClient.hget(key, field);
    }
    async hgetall(key) {
        return await this.redisClient.hgetall(key);
    }
    async flushall() {
        return await this.redisClient.flushall();
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)()
], RedisService);
//# sourceMappingURL=redis.service.js.map