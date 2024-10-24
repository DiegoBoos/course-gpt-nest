import { IsString } from 'class-validator';

export class DeleteMessageDto {
  @IsString()
  chatHistoryId: string;
}
