import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blacklist')
export class Blacklist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;
}
