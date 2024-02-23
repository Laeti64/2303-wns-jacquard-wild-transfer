import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { File } from "./File.entity";
import { SharedUrl } from "./SharedUrl.entity";

@Entity()
export class FileSharedUrlsSharedUrl {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => File, { nullable: false })
  @JoinColumn({ name: "fileId" })
  file: File;

  @ManyToOne(() => SharedUrl, { nullable: false })
  @JoinColumn({ name: "sharedUrlId" })
  sharedUrl: SharedUrl;
}
