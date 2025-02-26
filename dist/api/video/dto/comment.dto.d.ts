import { QueryOptionsDto } from '@src/shared/dto/query.options.dto';
export declare class CreateCommentDto {
    videoId: number;
    content: string;
    parentId?: number;
}
export declare class QueryCommentDto extends QueryOptionsDto {
    videoId: number;
    content: string;
}
