import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, MaxLength, Min } from 'class-validator';

export class AccountDto {
  @MaxLength(50, { message: '账号最大长度为50' })
  @IsNotEmpty({ message: '账号不能为空' })
  username!: string;

  @MaxLength(50, { message: '密码最大长度为50' })
  @IsOptional({ message: '密码' })
  password!: string;

  @MaxLength(512, { message: '简介最大长度为512' })
  @IsOptional({ message: '简介' })
  info!: string;

  @MaxLength(10, { message: '昵称最大长度为10' })
  @IsOptional({ message: '昵称' })
  nickname!: string;

  @IsOptional({ message: '头像' })
  avatar!: string;

  @IsInt({ message: '性别必须是整数' })
  @Type(() => Number)
  @IsOptional({ message: '性别' })
  gender!: number;

  @IsInt({ message: '年龄必须是整数' })
  @Type(() => Number)
  @IsOptional({ message: '年龄' })
  age!: number;

  @Min(1, { message: '排序最小值为1' })
  @IsInt({ message: '排序必须是整数' })
  @Type(() => Number)
  @IsOptional({ message: '排序' })
  sort!: number;

  @Min(1, { message: '父节点id最小值为1' })
  @IsInt({ message: '父节点id必须是整数' })
  @Type(() => Number)
  @IsOptional({ message: '父节点id' })
  parentId!: number;

  @Min(1, { message: '部门节点id最小值为1' })
  @IsInt({ message: '部门节点id必须是整数' })
  @Type(() => Number)
  @IsOptional({ message: '部门节点id' })
  departmentId!: number;

  @IsInt({ message: '账号类型必须是整数' })
  @Type(() => Number)
  @IsOptional({ message: '账号类型' })
  accountType!: number;
}
