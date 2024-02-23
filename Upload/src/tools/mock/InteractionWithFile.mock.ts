import mockedFiles from "./File.mock";
import mockedUsers from "./User.mock";

const mockedInteractionsWithFile = [
    {
      id: 'a1b2-c3d4-e5f6-g7h8',
      reaction: 'LIKE',
      author: mockedUsers[0],
      file: mockedFiles[0]
    },
    {
      id: 'b2c3-d4e5-f6g7-h8i9',
      reaction: 'DISLIKE',
      author: mockedUsers[1],
      file: mockedFiles[1]
    },
];

export default mockedInteractionsWithFile;
