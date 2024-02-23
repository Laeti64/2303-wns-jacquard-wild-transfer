import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column
} from "typeorm";
import { User } from "./User.entity";
import { File } from "./File.entity";

@Entity()
export class InteractionWithFile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
      type: "enum",
      enum: ["LIKE", "DISLIKE"]
  })
  reaction: string;

  @ManyToOne(() => User, user => user.fileInteractions)
  author: User;

  @ManyToOne(() => File)
  file: File;
}
