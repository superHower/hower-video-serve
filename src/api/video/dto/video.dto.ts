import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, IsOptional, Max, MaxLength, Min } from 'class-validator';
import { QueryOptionsDto } from '@src/shared/dto/query.options.dto';
export class VideoDto {
  @MaxLength(255, { message: '标题最大长度为255' })
  @IsNotEmpty({ message: '标题不能为空' })
  title!: string;

  @MaxLength(2000, { message: '描述最大长度2000' })
  @IsOptional()
  description?: string;

  @IsNotEmpty({ message: '视频地址不能为空' })
  videoUrl!: string;

  @IsOptional()
  coverUrl?: string;

  @IsOptional()
  @IsInt()
  duration?: number;

  @IsOptional()
  @IsInt()
  fileSize?: number;

  @IsOptional()
  @IsInt()
  tags?: number;

  @Min(0, { message: '状态范围0-5' })
  @Max(3, { message: '状态范围0-3' })
  @Type(() => Number)
  @IsOptional()
  status?: number;
}
export class QueryVideoDto extends QueryOptionsDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @Min(1)
  @IsInt()
  @Type(() => Number)
  accountId?: number;

  @IsOptional()
  @Min(0)
  @Max(2)
  @IsInt()
  @Type(() => Number)
  status?: number;

  @IsOptional()
  @Min(0)
  @Max(2)
  @IsInt()
  @Type(() => Number)
  tags?: number;
}

// 播放记录查询
export class PlayDto {
  @IsOptional()
  @Min(1)
  @IsInt()
  @Type(() => Number)
  videoId?: number;

  @IsOptional()
  @IsString()
  ipAddress?: string;

  @IsOptional()
  @IsString()
  agent?: string;
}
