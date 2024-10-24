import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { SaveTextMessageDto } from './dto/save-text-message.dto';
import { LoadMessagesDto } from './dto';
import { DeleteMessageDto } from './dto/delete-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('text')
  saveTextMessages(
    @Body()
    saveTextMessageDto: SaveTextMessageDto,
  ): Promise<Message[]> {
    return this.messagesService.saveTextMessages(saveTextMessageDto);
  }

  @Get(':chatHistoryId')
  async loadMessages(
    @Param() loadMessagesDto: LoadMessagesDto,
  ): Promise<Message[]> {
    return this.messagesService.loadMessages(loadMessagesDto);
  }

  @Delete(':chatHistoryId')
  deleteChatHistory(
    @Param() deleteMessageDto: DeleteMessageDto,
  ): Promise<void> {
    return this.messagesService.deleteChatHistory(deleteMessageDto);
  }
}
