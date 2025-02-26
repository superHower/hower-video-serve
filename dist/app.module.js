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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const http_exception_filter_1 = require("./filters/http-exception.filter");
const interceptors_1 = require("./interceptors");
const transform_interceptor_1 = require("./interceptors/transform.interceptor");
const validation_pipe_1 = require("./pipe/validation.pipe");
const utils_1 = require("./utils");
const api_module_1 = require("./api/api.module");
const shared_module_1 = require("./shared/shared.module");
const plugin_module_1 = require("./plugin/plugin.module");
const serve_static_1 = require("@nestjs/serve-static");
const path = __importStar(require("path"));
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path.join(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            config_1.ConfigModule.forRoot({
                ignoreEnvFile: false,
                isGlobal: true,
                load: [utils_1.getConfig],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    var _a;
                    return ({
                        type: 'mysql',
                        host: String(configService.get('datasource.host')),
                        port: Number.parseInt((_a = configService.get('datasource.port')) !== null && _a !== void 0 ? _a : '3306'),
                        username: String(configService.get('datasource.username')),
                        password: String(configService.get('datasource.password')),
                        database: String(configService.get('datasource.database')),
                        entities: [__dirname + '/**/*.entity{.ts,.js}'],
                        logging: configService.get('datasource.logging'),
                        timezone: '+08:00',
                        cache: {
                            duration: 60000,
                        },
                        extra: {
                            poolMax: 32,
                            poolMin: 16,
                            queueTimeout: 60000,
                            pollPingInterval: 60,
                            pollTimeout: 60,
                        },
                    });
                },
            }),
            api_module_1.ApiModule,
            shared_module_1.SharedModule,
            plugin_module_1.PluginModule,
        ],
        providers: [
            common_1.Logger,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: interceptors_1.LoggerInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: interceptors_1.RedisLimitInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: interceptors_1.RedisCacheInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: common_1.ClassSerializerInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_interceptor_1.TransformInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: interceptors_1.ApiInterceptor,
            },
            {
                provide: core_1.APP_PIPE,
                useClass: validation_pipe_1.ValidationPipe,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map