"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRequestMethod = exports.RequestMethod = exports.PATH_METADATA = exports.METHOD_METADATA = void 0;
exports.METHOD_METADATA = 'method';
exports.PATH_METADATA = 'path';
var RequestMethod;
(function (RequestMethod) {
    RequestMethod[RequestMethod["GET"] = 0] = "GET";
    RequestMethod[RequestMethod["POST"] = 1] = "POST";
    RequestMethod[RequestMethod["PUT"] = 2] = "PUT";
    RequestMethod[RequestMethod["DELETE"] = 3] = "DELETE";
    RequestMethod[RequestMethod["PATCH"] = 4] = "PATCH";
    RequestMethod[RequestMethod["ALL"] = 5] = "ALL";
    RequestMethod[RequestMethod["OPTIONS"] = 6] = "OPTIONS";
    RequestMethod[RequestMethod["HEAD"] = 7] = "HEAD";
})(RequestMethod || (exports.RequestMethod = RequestMethod = {}));
var IRequestMethod;
(function (IRequestMethod) {
    IRequestMethod["GET"] = "GET";
    IRequestMethod["POST"] = "POST";
    IRequestMethod["PUT"] = "PUT";
    IRequestMethod["DELETE"] = "DELETE";
    IRequestMethod["PATCH"] = "PATCH";
    IRequestMethod["ALL"] = "ALL";
    IRequestMethod["OPTIONS"] = "OPTIONS";
    IRequestMethod["HEAD"] = "HEAD";
})(IRequestMethod || (exports.IRequestMethod = IRequestMethod = {}));
//# sourceMappingURL=collect.api.js.map