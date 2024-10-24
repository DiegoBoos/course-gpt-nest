import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CourseModule } from 'src/courses/course.module';

@Module({
  imports: [CourseModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
