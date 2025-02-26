"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlQuery = void 0;
exports.getFileSuffixByName = getFileSuffixByName;
const url_1 = require("url");
const getUrlQuery = (urlPath, key) => {
    const url = new url_1.URL(urlPath, 'https://www.');
    const params = new URLSearchParams(url.search.substring(1));
    return params.get(key);
};
exports.getUrlQuery = getUrlQuery;
function getFileSuffixByName(extname) {
    const regex = /\.([^.]+)$/;
    const match = extname.match(regex);
    if (match) {
        return match[1];
    }
    return extname;
}
//# sourceMappingURL=url.js.map