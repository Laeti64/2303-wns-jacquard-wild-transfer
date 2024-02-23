import mockedGroups from "./Group.mock";
import mockedUsers from "./User.mock";


const mockedUserGroups = [
    {
      id: 'x1y2-z3a4-b5c6-d7e8',
      user: mockedUsers[0],
      group: mockedGroups[0]
    },
    {
      id: 'y2z3-a4b5-c6d7-e8f9',
      user: mockedUsers[1],
      group: mockedGroups[1]
    },
    {
      id: 'z3a4-b5c6-d7e8-f9g0',
      user: mockedUsers[2],
      group: mockedGroups[2]
    },
];

export default mockedUserGroups;
