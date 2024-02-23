import mockedComments from "./Comment.mock";
import mockedUsers from './User.mock';

const mockedInteractionsWithComment = [
    {
      id: 'a1b2-c3d4-e5f6-g7h8',
      reaction: 'LIKE',
      author: mockedUsers[0],
      comment: mockedComments[0]
    },
    {
      id: 'b2c3-d4e5-f6g7-h8i9',
      reaction: 'DISLIKE',
      author: mockedUsers[1],
      comment: mockedComments[1]
    },
];

export default mockedInteractionsWithComment;
