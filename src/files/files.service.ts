import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  private readonly logger = new Logger('FilesService');

  constructor() {}

  async getStaticCourseFiles(courseCode: string, fileName: string) {
    const path = join(__dirname, `../../static/courses`, fileName);

    if (!existsSync(path)) {
      throw new BadRequestException(`File ${fileName} not found`);
    }

    return path;
  }
}
