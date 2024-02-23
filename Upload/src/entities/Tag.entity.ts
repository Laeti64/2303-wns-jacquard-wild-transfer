// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   JoinTable,
//   ManyToMany,
//   OneToMany,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from "typeorm";
// import { File } from "./File.entity";

// @Entity()
// export class Tag {
//   @PrimaryGeneratedColumn("uuid")
//   id: string;

//   @Column()
//   name: string;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;

//   @ManyToMany(() => File, (file) => file.tags)
//   @JoinTable()
//   files: File[];
// }
