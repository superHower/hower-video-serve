"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryCommentDto = exports.CreateCommentDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const query_options_dto_1 = require("../../../shared/dto/query.options.dto");
class CreateCommentDto {
}
exports.CreateCommentDto = CreateCommentDto;
__decorate([
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateCommentDto.prototype, "videoId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(200, { message: '描述最大长度200' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCommentDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateCommentDto.prototype, "parentId", void 0);
class QueryCommentDto extends query_options_dto_1.QueryOptionsDto {
}
exports.QueryCommentDto = QueryCommentDto;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QueryCommentDto.prototype, "videoId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryCommentDto.prototype, "content", void 0);
//# sourceMappingURL=comment.dto.js.map