import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Chat } from '../../chats/entities/chat.entity';

@Entity()
export class Course {
  @PrimaryColumn()
  courseCode: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  icon?: string;

  @OneToMany(() => Chat, (chat) => chat.course)
  chats?: Chat[];
}
