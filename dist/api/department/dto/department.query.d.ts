import { QueryOptionsDto } from '@src/shared/dto/query.options.dto';
export declare class QueryDepartmentDto extends QueryOptionsDto {
    readonly status: number;
    readonly title: number;
    readonly tenantId: number;
}
