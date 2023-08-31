import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ConversationHistoric } from './ConversationHistoric';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  user_name: string;

  @Column({ type: 'text', unique: true })
  password: string;

  @OneToMany(() => ConversationHistoric, (conversationHistoric) => conversationHistoric.user)
  conversationsHistoric: ConversationHistoric[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
