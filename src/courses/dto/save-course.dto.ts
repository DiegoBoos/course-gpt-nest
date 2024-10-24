import { IsArray, IsOptional, IsString } from 'class-validator';

export class SaveCourseDto {
  @IsString()
  courseCode: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsArray()
  @IsOptional()
  files?: [];
}
