import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity('conversations_historic')
export class ConversationHistoric {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text'})
  text: string;

  
  @Column({ type: 'int' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.conversationsHistoric)
  @JoinColumn({ name: 'user_id' })
  user: User;

  
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
