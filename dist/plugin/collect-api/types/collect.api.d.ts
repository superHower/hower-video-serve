export declare const METHOD_METADATA = "method";
export declare const PATH_METADATA = "path";
export declare enum RequestMethod {
    GET = 0,
    POST = 1,
    PUT = 2,
    DELETE = 3,
    PATCH = 4,
    ALL = 5,
    OPTIONS = 6,
    HEAD = 7
}
export declare enum IRequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
    ALL = "ALL",
    OPTIONS = "OPTIONS",
    HEAD = "HEAD"
}
export interface IPermission {
    moduleName: string;
    methodName: string;
    method: string;
    url: string;
}
