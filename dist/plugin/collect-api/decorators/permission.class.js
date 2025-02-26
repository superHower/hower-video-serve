"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionClass = void 0;
const common_1 = require("@nestjs/common");
const collect_1 = require("../constants/collect");
const PermissionClass = (name) => {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(collect_1.PERMISSION_CLASS, name));
};
exports.PermissionClass = PermissionClass;
//# sourceMappingURL=permission.class.js.map