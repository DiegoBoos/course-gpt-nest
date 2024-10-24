import { IsArray, IsOptional, IsString } from 'class-validator';
import { Message } from 'src/messages/entities/message.entity';

export class SaveChatDto {
  @IsString()
  courseCode: string;

  @IsArray()
  @IsOptional()
  messages?: Message[];
}
