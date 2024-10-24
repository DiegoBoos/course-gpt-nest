import { Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Course } from '../../courses/entities/course';
import { Message } from 'src/messages/entities/message.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  chatHistoryId: string;

  @ManyToOne(() => Course, (course) => course.chats)
  course: Course;

  @OneToMany(() => Message, (message) => message.chat, { cascade: true })
  messages?: Message[];
}
