import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Unique,
  OneToMany
} from "typeorm";
import { User } from "./User.entity";
import { Comment } from "./Comment.entity";

@Entity()
@Unique(["url"])
export class File {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  format: string;

  @Column()
  duration: string;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.files)
  author: User;

  @Column()
  isPublic: boolean;

  @OneToMany(() => Comment, comment => comment.file)
  comments: Comment[];
}
