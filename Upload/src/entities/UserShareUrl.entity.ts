import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.entity";
import { SharedUrl } from "./SharedUrl.entity";

@Entity()
export class UserSharedUrlsSharedUrl {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => SharedUrl)
  @JoinColumn({ name: "sharedUrlId" })
  sharedUrl: SharedUrl;
}
