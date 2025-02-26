import { QueryOptionsDto } from '@src/shared/dto/query.options.dto';
export declare class QueryTenantDto extends QueryOptionsDto {
    readonly name: string;
    readonly status: number;
    readonly mobile: string;
    readonly username: string;
}
