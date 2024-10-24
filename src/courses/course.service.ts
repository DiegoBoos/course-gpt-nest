import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course';
import { SaveCourseDto } from './dto';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  private readonly logger = new Logger('CourseService');

  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async saveCourse(saveCourseDto: SaveCourseDto): Promise<Course> {
    try {
      const { ...courseDetails } = saveCourseDto;

      const course = this.coursesRepository.create(courseDetails);

      await this.coursesRepository.save(course);

      return course;
    } catch (error) {
      if (error.code === '23505') throw new BadRequestException(error.detail);

      this.logger.error(error);
      throw new InternalServerErrorException(
        'Unexpected error, check server logs',
      );
    }
  }

  async getCourses(): Promise<Course[]> {
    try {
      const courses = await this.coursesRepository.find({
        relations: {
          chats: true,
        },
      });

      return courses.map((course) => ({
        ...course,
      }));
    } catch (error) {
      if (error.code === '23505') throw new BadRequestException(error.detail);

      this.logger.error(error);
      throw new InternalServerErrorException(
        'Unexpected error, check server logs',
      );
    }
  }

  async deleteCourses(): Promise<void> {
    try {
      await this.coursesRepository.delete({});
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Unexpected error, check server logs',
      );
    }
  }
}
