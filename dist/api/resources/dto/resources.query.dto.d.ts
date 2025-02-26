import { QueryOptionsDto } from '@src/shared/dto/query.options.dto';
export declare class QueryResourcesDto extends QueryOptionsDto {
    readonly title: string;
    readonly resourcesType: number;
    readonly parentId: number;
    readonly status: number;
    readonly isBtn: number;
}
