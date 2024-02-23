// import { getConnection ,getRepository  } from "typeorm";
// import * as faker from 'faker';
// import fs from 'fs';
// import path from 'path';

// import { User } from "../../entities/User.entity";
// import { Comment } from "../../entities/Comment.entity";
// import { File } from "../../entities/File.entity";
// import { Group } from "../../entities/Group.entitiy";
// import { InteractionWithComment } from "../../entities/InteractionWithComment.entity";
// import { InteractionWithFile } from "../../entities/InteractionWithFile.entity";
// import { SharedUrl } from "../../entities/SharedUrl.entity";
// import { UserGroupsGroup } from "../../entities/UserGroups.entity";
// import { UserSharedUrlsSharedUrl } from "../../entities/UserSharedUrl.entity";
// import { FileSharedUrlsSharedUrl } from "../../entities/FileSharedUrls.entity";

// async function seedDatabase() {
//     const connection = await getConnection();

//     const users: User[] = [];
//     for (let i = 0; i < 100; i++) {
//         const user = new User();
//         user.username = faker.internet.userName();
//         user.email = faker.internet.email();
//         user.password = faker.internet.password();
//         user.imgUrl = faker.image.avatar();
//         user.role = "USER";
//         await connection.manager.save(user);
//         users.push(user);
//     }

//     const groups: Group[] = [];
//     for (let i = 0; i < 10; i++) {
//         const group = new Group();
//         group.name = faker.company.companyName();
//         await connection.manager.save(group);
//         groups.push(group);
//     }

//     const files: File[] = [];
//     for (let user of users) {
//         const file = new File();
//         file.title = faker.system.fileName();
//         file.description = faker.lorem.sentence();
//         file.format = faker.system.fileExt();
//         file.duration = `${faker.random.number(120)} mins`;
//         file.url = faker.internet.url();
//         file.author = user;
//         file.isPublic = faker.random.boolean();
//         await connection.manager.save(file);
//         files.push(file);
//     }

//     for (let user of users) {
//         const comment = new Comment();
//         comment.content = faker.lorem.paragraph();
//         comment.author = user;
//         comment.file = faker.random.arrayElement(files);
//         await connection.manager.save(comment);
//     }

//     const sharedUrls: SharedUrl[] = [];
//     for (let i = 0; i < 50; i++) {
//         const sharedUrl = new SharedUrl();
//         sharedUrl.title = faker.lorem.sentence();
//         sharedUrl.endAt = faker.date.future();
//         await connection.manager.save(sharedUrl);
//         sharedUrls.push(sharedUrl);
//     }

//     for (let user of users) {
//         const interaction = new InteractionWithComment();
//         interaction.reaction = faker.random.arrayElement(["LIKE", "DISLIKE"]);
//         interaction.author = user;
//         interaction.comment = new Comment();
//         await connection.manager.save(interaction);
//     }

//     for (let user of users) {
//         const interaction = new InteractionWithFile();
//         interaction.reaction = faker.random.arrayElement(["LIKE", "DISLIKE"]);
//         interaction.author = user;
//         interaction.file = new File();
//         await connection.manager.save(interaction);
//     }

//     for (let user of users) {
//         const userGroup = new UserGroupsGroup();
//         userGroup.user = user;
//         userGroup.group = faker.random.arrayElement(groups);
//         await connection.manager.save(userGroup);
//     }

//     for (let user of users) {
//         const userSharedUrl = new UserSharedUrlsSharedUrl();
//         userSharedUrl.user = user;
//         userSharedUrl.sharedUrl = faker.random.arrayElement(sharedUrls);
//         await connection.manager.save(userSharedUrl);
//     }

//     for (let file of files) {
//         const fileSharedUrl = new FileSharedUrlsSharedUrl();
//         fileSharedUrl.file = file;
//         fileSharedUrl.sharedUrl = faker.random.arrayElement(sharedUrls);
//         await connection.manager.save(fileSharedUrl);
//     }

//     console.log("Données insérées !");
// }

// seedDatabase().then(() => {
//     console.log("Toutes les données fictives ont été générées !");
// }).catch(error => {
//     console.error("Erreur lors de la génération de données fictives :", error);
// });
