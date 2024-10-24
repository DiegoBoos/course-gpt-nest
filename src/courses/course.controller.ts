import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { SaveCourseDto } from './dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async saveCourse(@Body() saveCourseDto: SaveCourseDto) {
    return this.courseService.saveCourse(saveCourseDto);
  }

  @Get()
  async getCourses() {
    return this.courseService.getCourses();
  }

  @Delete()
  async deleteCourses() {
    return this.courseService.deleteCourses();
  }
}
