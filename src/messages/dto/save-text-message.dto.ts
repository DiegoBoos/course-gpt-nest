import { IsArray, IsOptional, IsString } from 'class-validator';
import { Message } from '../entities/message.entity';

export class SaveTextMessageDto {
  @IsString()
  chatHistoryId: string;

  @IsArray()
  @IsOptional()
  messages: Message[];
}
