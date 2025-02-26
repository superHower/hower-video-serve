import { QueryOptionsDto } from '@src/shared/dto/query.options.dto';
export declare class QueryAccountDto extends QueryOptionsDto {
    readonly status: number;
    readonly tenantId: number;
    readonly username: string;
}
