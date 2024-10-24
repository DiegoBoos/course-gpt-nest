import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetChatsDto, SaveChatDto, DeleteChatDto } from './dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  private readonly logger = new Logger('ChatService');

  constructor(
    @InjectRepository(Chat)
    private chatsRepository: Repository<Chat>,
  ) {}

  async saveChat(saveChatDto: SaveChatDto): Promise<Chat> {
    try {
      const { courseCode } = saveChatDto;

      const chat = this.chatsRepository.create({
        course: { courseCode },
      });

      await this.chatsRepository.save(chat);

      return {
        chatHistoryId: chat.chatHistoryId,
        ...chat,
      };
    } catch (error) {
      if (error.code === '23505') throw new BadRequestException(error.detail);

      this.logger.error(error);
      throw new InternalServerErrorException(
        'Unexpected error, check server logs',
      );
    }
  }

  async getChats(getChatsDto: GetChatsDto): Promise<Chat[]> {
    try {
      const { courseCode } = getChatsDto;

      const chats = await this.chatsRepository.find({
        where: {
          course: {
            courseCode: courseCode,
          },
        },
        relations: {
          course: true,
        },
      });

      return chats;
    } catch (error) {
      if (error.code === '23505') throw new BadRequestException(error.detail);

      this.logger.error(error);
      throw new InternalServerErrorException(
        'Unexpected error, check server logs',
      );
    }
  }

  async deleteChat(deleteChatDto: DeleteChatDto): Promise<void> {
    try {
      const { chatHistoryId } = deleteChatDto;

      const chat = await this.chatsRepository.findOne({
        where: { chatHistoryId },
      });

      await this.chatsRepository.remove(chat);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Unexpected error, check server logs',
      );
    }
  }
}
