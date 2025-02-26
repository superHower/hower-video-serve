import * as path from 'path';
import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import * as fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { getFileSuffixByName } from '../../utils/url';
import moment from 'moment';
const OSS = require('ali-oss'); // eslint-disable-line
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UploadOssService {
  private client: any;
  constructor(private readonly configService: ConfigService) {}
  onModuleInit() {
    this.client = new OSS({
      accessKeyId: this.configService.get('aliyunOss.accessKeyId'),
      accessKeySecret: this.configService.get('aliyunOss.accessKeySecret'),
      region: this.configService.get('aliyunOss.endpointUrl'),
      bucket: this.configService.get('aliyunOss.bucketName'),
      secure: true, // 开启https
    });
  }
  /**
   * @Author: Hower
   * @Description: 定义单个文件的上传
   * @param {*} Optional
   * @return {*}
   */
  public async uploadFile(file: Express.Multer.File): Promise<any> {
    return await this.process(file);
  }

  /**
   * @Author: Hower
   * @Description: 上传多个文件
   * @param {*} Optional
   * @return {*}
   */
  public async uploadFiles(files: Array<Express.Multer.File>): Promise<any[]> {
    const filenameList: Array<any> = [];
    for (const file of files) {
      const result = await this.process(file);
      filenameList.push(result);
    }
    return filenameList;
  }

  /**
   * @Author: Hower
   * @description: 处理上传文件的过程
   * @return {*}
   */
  private async process(file: Express.Multer.File): Promise<any> {
    console.log('输出', file);
    // 现在文件大小
    const fileSize = Number(file.size) / 1000 / 1000;
    const defaultSize = this.configService.get('aliyunOss.OssDefaultSize');
    if (fileSize > defaultSize) {
      throw new HttpException(
        `你上传的文件体积大于 ${defaultSize}M，请先选择在线压缩工具压缩后上传`,
        HttpStatus.OK
      );
    }
    // 文件的扩展名
    const extname = path.extname(file.originalname).toLocaleLowerCase();
    // 文件名
    const filename = `${Date.now()}${Number.parseInt(String(Math.random() * 1000), 10)}${extname}`;
    // 如果有文件格式约束就判断上传文件
    const typeList = ['.png', '.jpg', '.gif', '.jpeg'];
    if (
      typeList &&
      typeList.length &&
      !typeList.map((item) => item.toLocaleLowerCase()).includes(extname)
    ) {
      throw new HttpException(
        `上传图片格式限制为:[${typeList}]其中一种,你上传的图片格式里包含了:${extname}`,
        HttpStatus.NOT_ACCEPTABLE
      );
    }
    // 根据格式生成文件夹
    const filePath = path.join('image', moment(Date.now()).format('YYYY-MM-DD'));
    const target = path.join(filePath, filename);

    const result = await this.client.put(target, file.buffer);
    return { data: { url: result.url, fileName: file.originalname, fileSize: file.size } };
  }

  /**
   * 验证文件
   */
  async verifyFile(fileHash: string, totalCount: number, extname: string) {
    const fileSuffix = getFileSuffixByName(extname);
    const dirPath = path.join(process.cwd(), `/uploads/${fileSuffix}/${fileHash}`);
    const filePath = dirPath + '.' + extname;
    const fileDBPath = `/uploads/${fileSuffix}/${fileHash}.${extname}`;
    let res = Array(totalCount)
      .fill(0)
      .map((_, index) => index + 1);

    try {
      // 读取文件状态
      await fs.stat(filePath);
      // 读取成功，即秒传
      const data = {
        neededFileList: [],
        message: '该文件已被上传',
        filePath: fileDBPath,
      };
      return { data: { code: 'FILE_EXIST', data } };
    } catch (fileError) {
      try {
        await fs.stat(dirPath);
        const files = await fs.readdir(dirPath);
        if (files.length < totalCount) {
          // 计算待上传序列
          res = res.filter((fileIndex) => {
            return !files.includes(`chunk-${fileIndex}`);
          });
          const data = { neededFileList: res };
          return { data: { code: 'SUCCESS', data } };
        } else {
          // 已上传所有分块但未进行合并, 通知前端合并文件
          const data = {
            neededFileList: [],
            message: '已完成所有分片上传，请合并文件',
            filePath: fileDBPath,
          };
          return { data: { code: 'ALL_CHUNK_UPLOAD', data } };
        }
      } catch (dirError) {
        // 读取文件夹失败，返回全序列
        const data = { neededFileList: res };
        return { data: { code: 'SUCCESS', data } };
      }
    }
  }
  /**
   * 上传分片
   */
  async uploadChunk(params: {
    chunk: Express.Multer.File;
    chunkIndex: number;
    fileHash: string;
    extname: string;
  }): Promise<any> {
    const { chunk, fileHash, chunkIndex, extname } = params;

    // 1. 参数校验
    if (!chunk?.buffer || !fileHash || chunkIndex < 1) {
      throw new BadRequestException('无效的分片参数');
    }

    // 2. 生成路径
    const fileSuffix = getFileSuffixByName(extname);
    const dirPath = path.join(process.cwd(), 'uploads', fileSuffix, fileHash);
    const chunkPath = path.join(dirPath, `${fileHash}-${chunkIndex}.part`);

    try {
      // 3. 检查分片是否已存在
      try {
        await fs.access(chunkPath);
        return { data: { code: 'CHUNK_EXIST', message: '分片已存在' } };
      } catch (error) {
        // 4. 创建目录（原子操作避免竞争）
        await fs.mkdir(dirPath, { recursive: true });

        // 5. 写入分片并校验
        await fs.writeFile(chunkPath, chunk.buffer);
        // 读取写入的文件并校验
        const savedBuffer = await fs.readFile(chunkPath);
        if (!savedBuffer.equals(chunk.buffer)) {
          await fs.unlink(chunkPath);
          throw new Error('分片写入校验失败');
        }

        return { data: { code: 'SUCCESS', message: '上传分片成功' } };
      }
    } catch (error) {
      console.error(`[ERROR] 分片处理失败`, { fileHash, chunkIndex, error });
      return {
        data: {
          code: 'UPLOAD_FAIL',
          message: '分片上传失败',
        },
      };
    }
  }
  /**
   * 合并文件
   */
  async mergeFile(fileHash: string, extname: string) {
    const fileSuffix = getFileSuffixByName(extname);
    const dirPath = path.join(process.cwd(), `/uploads/${fileSuffix}/${fileHash}`);
    const filePath = dirPath + '.' + extname;
    const fileDBPath = `/uploads/${fileSuffix}/${fileHash}.${extname}`;

    try {
      // 检查文件是否已存在
      await fs.access(filePath);
      const data = {
        neededFileList: [],
        message: '该文件已被上传',
        filePath: fileDBPath,
      };
      return { data: { code: 'FILE_EXIST', data } };
    } catch (error) {
      // 文件不存在，继续执行
    }

    // 创建写入流
    const writeStream = createWriteStream(filePath);

    // 读取文件夹，将文件夹中的所有分块进行合并
    try {
      const files = await fs.readdir(dirPath);

      // 对文件进行排序
      files.sort((a, b) => {
        const indexA = parseInt(a.split('-').pop() ?? '0');
        const indexB = parseInt(b.split('-').pop() ?? '0');
        return indexA - indexB;
      });

      // 按顺序写入/合并
      for (let index = 0; index < files.length; index++) {
        const filename = files[index];
        const curFilePath = path.join(dirPath, filename);
        const readStream = createReadStream(curFilePath);

        // 判断是否是最后一块
        const isLastChunk = index === files.length - 1;

        // 使用 await 确保异步操作完成
        await new Promise((resolve, reject) => {
          readStream.pipe(writeStream, { end: isLastChunk });
          readStream.on('end', resolve as () => void);
          readStream.on('error', reject);
        });
      }
      console.log('合并完毕');
    } catch (error) {
      console.error('读取目录失败:', error);
      return { data: { code: 'FAIL', data: null, message: '文件合并失败' } };
    }

    // 删除保存分块的文件夹
    try {
      const files = await fs.readdir(dirPath);
      await Promise.all(files.map((file) => fs.unlink(path.join(dirPath, file))));
      await fs.rmdir(dirPath);
      console.log('文件夹删除成功');
    } catch (error) {
      console.error('移除文件夹错误：', error);
    }
    return { data: { code: 'SUCCESS', data: { filePath: fileDBPath }, message: '文件合并成功' } };
  }
}
