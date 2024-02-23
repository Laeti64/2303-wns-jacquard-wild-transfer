import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column
} from "typeorm";
import { User } from "./User.entity";
import { Comment } from "./Comment.entity";

@Entity()
export class InteractionWithComment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
      type: "enum",
      enum: ["LIKE", "DISLIKE"]
  })
  reaction: string;

  @ManyToOne(() => User, user => user.commentInteractions)
  author: User;

  @ManyToOne(() => Comment)
  comment: Comment;
}
