import { IsString } from 'class-validator';

export class LoadMessagesDto {
  @IsString()
  chatHistoryId: string;
}
