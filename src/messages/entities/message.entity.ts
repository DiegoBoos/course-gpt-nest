import { Chat } from 'src/chats/entities/chat.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  messageId: number;

  @Column()
  isLLM: boolean;

  @Column()
  messageType: string;

  @Column()
  text: string;

  @Column('simple-array', { nullable: true })
  source: string[];

  @Column({ nullable: true })
  title: string;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;
}
