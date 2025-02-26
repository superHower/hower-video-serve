"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionMeta = void 0;
const common_1 = require("@nestjs/common");
const collect_1 = require("../constants/collect");
const PermissionMeta = (name) => {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(collect_1.PERMISSION_META, name));
};
exports.PermissionMeta = PermissionMeta;
//# sourceMappingURL=permission.meta.js.map