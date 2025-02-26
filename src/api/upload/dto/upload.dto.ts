// verify-file.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VerifyDto {
  @IsString()
  @IsNotEmpty()
  fileHash!: string;

  @IsNumber()
  totalCount!: number;

  @IsString()
  @IsNotEmpty()
  extname!: string;
}

export class MergeDto {
  @IsString()
  @IsNotEmpty()
  fileHash!: string;

  @IsString()
  @IsNotEmpty()
  extname!: string;
}
