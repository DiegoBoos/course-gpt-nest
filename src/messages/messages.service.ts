import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { LoadMessagesDto, SaveTextMessageDto } from './dto';
import { DeleteMessageDto } from './dto/delete-message.dto';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger('MessagesService');

  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async saveTextMessages(
    saveTextMessageDto: SaveTextMessageDto,
  ): Promise<Message[]> {
    try {
      const savedMessages: Message[] = [];
      const { chatHistoryId, messages } = saveTextMessageDto;

      for (const message of messages) {
        const newMessage = this.messagesRepository.create({
          chat: { chatHistoryId },
          isLLM: message.isLLM,
          messageType: 'text',
          text: message.text,
          source: message.source,
          title: message.title,
        });

        await this.messagesRepository.save(newMessage);
        savedMessages.push(newMessage);
      }

      return savedMessages;
    } catch (error) {
      if (error.code === '23505') throw new BadRequestException(error.detail);

      this.logger.error(error);
      throw new InternalServerErrorException(
        'Unexpected error, check server logs',
      );
    }
  }

  async loadMessages(loadMessagesDto: LoadMessagesDto): Promise<Message[]> {
    try {
      const { chatHistoryId } = loadMessagesDto;

      return this.messagesRepository.find({
        where: {
          chat: {
            chatHistoryId,
          },
        },
        relations: {
          chat: true,
        },
      });
    } catch (error) {
      if (error.code === '23505') throw new BadRequestException(error.detail);

      this.logger.error(error);
      throw new InternalServerErrorException(
        'Unexpected error, check server logs',
      );
    }
  }

  async deleteChatHistory(deleteMessageDto: DeleteMessageDto): Promise<void> {
    try {
      const { chatHistoryId } = deleteMessageDto;

      await this.messagesRepository.delete({
        chat: {
          chatHistoryId,
        },
      });
    } catch (error) {
      if (error.code === '23505') throw new BadRequestException(error.detail);

      this.logger.error(error);
      throw new InternalServerErrorException(
        'Unexpected error, check server logs',
      );
    }
  }
}
