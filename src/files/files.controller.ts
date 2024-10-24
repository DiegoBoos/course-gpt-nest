import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { fileNamer } from './helpers/fileNamer.helper';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('course')
  async findCourseFile(@Res() res: Response) {
    const courseCode = res.req.query.courseCode as string;
    const fileName = res.req.query.fileName as string;

    const path = await this.filesService.getStaticCourseFiles(
      courseCode,
      fileName,
    );

    res.sendFile(path);
  }

  @Post('course')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './static/courses',
        filename: fileNamer,
      }),
      fileFilter: fileFilter,
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Invalid file');
    }

    const secureUrl = `${this.configService.get('HOST_API')}${file.originalname}`;
    return {
      secureUrl,
    };
  }
}
