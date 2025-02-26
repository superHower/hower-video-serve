export interface ICurrentUserType {
    id: number;
    username: string;
    tenantId: number;
    accountType: number;
}
export declare const CurrentUser: (...dataOrPipes: (string | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
