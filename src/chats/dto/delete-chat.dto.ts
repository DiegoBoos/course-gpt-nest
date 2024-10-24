import { IsString } from 'class-validator';

export class DeleteChatDto {
  @IsString()
  chatHistoryId: string;
}
