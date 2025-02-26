import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, MaxLength, IsOptional, Min } from 'class-validator';
import { QueryOptionsDto } from '@src/shared/dto/query.options.dto';

// 创建评论
export class CreateCommentDto {
  @Min(1)
  @IsInt()
  @Type(() => Number)
  videoId!: number;

  @IsNotEmpty()
  @MaxLength(200, { message: '描述最大长度200' })
  @IsOptional()
  content!: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  parentId?: number;
}

// 评论分页查询
export class QueryCommentDto extends QueryOptionsDto {
  @Type(() => Number)
  videoId!: number;

  @IsOptional()
  content!: string;
}
