import mockedFiles from "./File.mock";
import mockedUsers from "./User.mock";

const mockedComments = [
    {
      id: 'a1b2-c3d4-e5f6-g7h8',
      content: 'Ceci est un commentaire pour le fichier 1 par l\'utilisateur 1',
      createdAt: new Date(),
      updatedAt: new Date(),
      author: mockedUsers[0],
      file: mockedFiles[0]
    },
    {
      id: 'b2c3-d4e5-f6g7-h8i9',
      content: 'Ceci est un commentaire pour le fichier 2 par l\'utilisateur 2',
      createdAt: new Date(),
      updatedAt: new Date(),
      author: mockedUsers[1],
      file: mockedFiles[1]
    },
    {
      id: 'c3d4-e5f6-g7h8-i9j0',
      content: 'Ceci est un autre commentaire pour le fichier 1 par l\'utilisateur 3',
      createdAt: new Date(),
      updatedAt: new Date(),
      author: mockedUsers[2],
      file: mockedFiles[0]
    },
];

export default mockedComments;