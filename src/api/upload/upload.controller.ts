import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadOssService } from '../../plugin/file/upload-oss.service';
import { VerifyDto, MergeDto } from './dto/upload.dto';
import { Body } from '@nestjs/common';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadOssService: UploadOssService) {}

  /**
   * 上传单个文件
   */
  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('没有文件上传.');
    return await this.uploadOssService.uploadFile(file);
  }

  /**
   * 上传多个文件
   */
  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    if (!files || files.length === 0) throw new BadRequestException('没有文件上传.');
    return await this.uploadOssService.uploadFiles(files);
  }
  /**
   * 验证文件
   */
  @Post('verify')
  async verifyFile(@Body() req: VerifyDto) {
    const { fileHash, totalCount, extname } = req;
    return await this.uploadOssService.verifyFile(fileHash, totalCount, extname);
  }

  /**
   * 上传分片
   */
  @Post('chunk')
  @UseInterceptors(FileInterceptor('chunk'))
  async uploadChunk(
    @UploadedFile() chunk: Express.Multer.File, // 获取分片文件
    @Body()
    body: {
      chunkIndex: string;
      fileHash: string;
      extname: string;
    }
  ) {
    console.log('输出', chunk);
    if (!chunk) throw new BadRequestException('没有分片文件上传.');

    return await this.uploadOssService.uploadChunk({
      chunk,
      chunkIndex: parseInt(body.chunkIndex), // 转换为数字
      fileHash: body.fileHash,
      extname: body.extname,
    });
  }

  /**
   * 合并分片
   */
  @Post('merge')
  async mergeFile(@Body() req: MergeDto) {
    const { fileHash, extname } = req;
    return await this.uploadOssService.mergeFile(fileHash, extname);
  }
}
