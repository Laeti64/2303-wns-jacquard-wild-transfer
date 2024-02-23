import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { User } from "./User.entity";
import { Group } from "./Group.entitiy";

@Entity()
export class UserGroupsGroup {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User;

    @ManyToOne(() => Group)
    @JoinColumn({ name: "groupId" })
    group: Group;
}
