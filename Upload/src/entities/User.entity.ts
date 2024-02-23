import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Unique
} from "typeorm";
import { Comment } from "./Comment.entity";
import { File } from "./File.entity";
import { InteractionWithComment } from "./InteractionWithComment.entity";
import { InteractionWithFile } from "./InteractionWithFile.entity";

@Entity()
@Unique(["username"])
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  imgUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
      type: "enum",
      enum: ["USER"], // Add other roles if needed
      default: "USER"
  })
  role: string;

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];

  @OneToMany(() => File, file => file.author)
  files: File[];

  @OneToMany(() => InteractionWithComment, interaction => interaction.author)
  commentInteractions: InteractionWithComment[];

  @OneToMany(() => InteractionWithFile, interaction => interaction.author)
  fileInteractions: InteractionWithFile[];
}
