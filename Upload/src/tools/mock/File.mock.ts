import mockedUsers from "./User.mock";
import mockedComments from "./Comment.mock";
import mockedInteractionsWithFile from "./InteractionWithFile.mock";
import mockedFileSharedUrls from "./FileSharesUrl.mock";
import { MockedFile } from "../../interfaces/InterfaceMock";

const mockedFiles: MockedFile[] = [
  {
    id: "1a2b-3c4d-5e6f-7g8h",
    title: "Fichier Test 1",
    description: "Description du fichier test 1",
    format: "mp4",
    duration: "120",
    url: "/path/to/file1.mp4",
    createdAt: new Date(),
    updatedAt: new Date(),
    author: mockedUsers[0],
    isPublic: true,
    comments: [mockedComments[0], mockedComments[1]],
  },
  {
    id: "2b3c-4d5e-6f7g-8h9i",
    title: "Fichier Test 2",
    description: "Description du fichier test 2",
    format: "avi",
    duration: "150",
    url: "/path/to/file2.avi",
    createdAt: new Date(),
    updatedAt: new Date(),
    author: mockedUsers[1],
    isPublic: false,
    comments: [mockedComments[2]],
  },
  {
    id: "3c4d-5e6f-7g8h-9i0j",
    title: "Fichier Test 3",
    description: "Description du fichier test 3",
    format: "mkv",
    duration: "180",
    url: "/path/to/file3.mkv",
    createdAt: new Date(),
    updatedAt: new Date(),
    author: mockedUsers[2],
    isPublic: true,
    comments: [mockedComments[3]],
  },
];

export default mockedFiles;
