"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const core_1 = require("@nestjs/core");
const enums_1 = require("@nestjs/common/enums");
const services_1 = require("@nestjs/common/services");
const app_module_1 = require("./app.module");
const utils_1 = require("./utils");
exports.config = (0, utils_1.getConfig)();
const PORT = exports.config.PORT || 8080;
const PREFIX = exports.config.PREFIX || '/';
async function bootstrap() {
    const logger = new services_1.Logger('main.ts');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: utils_1.IS_DEV ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn'],
    });
    app.enableCors();
    app.enableVersioning({
        defaultVersion: '1',
        type: enums_1.VersioningType.URI,
    });
    app.setGlobalPrefix(PREFIX);
    await app.listen(PORT, () => {
        logger.log(`服务已经启动,接口请访问:http://localhost:${PORT}/${PREFIX}/v1`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map