import { Injectable } from '@nestjs/common';
import { CourseService } from 'src/courses/course.service';
import { initialData } from './seed-courses';

@Injectable()
export class SeedService {
  constructor(private readonly courseService: CourseService) {}

  async executeSeed() {
    await this.courseService.deleteCourses();

    const courses = initialData.courses;

    const insertPromisses = [];

    courses.forEach((course) => {
      insertPromisses.push(this.courseService.saveCourse(course));
    });

    await Promise.all(insertPromisses);

    return true;
  }
}
