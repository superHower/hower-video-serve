import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadOssService } from '../../plugin/file/upload-oss.service';

@Module({
  controllers: [UploadController],
  providers: [UploadOssService],
})
export class UploadModule {}
