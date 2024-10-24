import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { GetChatsDto, SaveChatDto, DeleteChatDto } from './dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async saveChat(@Body() saveChatDto: SaveChatDto) {
    return this.chatService.saveChat(saveChatDto);
  }

  @Get(':courseCode')
  async getChats(@Param() getChatsDto: GetChatsDto) {
    return this.chatService.getChats(getChatsDto);
  }

  @Delete(':chatHistoryId')
  async deleteChats(@Param() deleteCHatDto: DeleteChatDto) {
    return this.chatService.deleteChat(deleteCHatDto);
  }
}
