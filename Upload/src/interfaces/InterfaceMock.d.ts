export interface MockedFile {
  id: string;
  title: string;
  description: string;
  format: string;
  duration: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  author: MockedUser;
  isPublic: boolean;
  comments: MockedComment[];
}

export interface MockedUser {
  id: string;
  username: string;
  email: string;
  password: string;
  imgUrl: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  files: MockedFile[];
  comments?: MockedComment[];
  commentInteractions?: MockedInteractionWithComment[];
  fileInteractions?: MockedInteractionWithFile[];
}

export interface MockedComment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: MockedUser;
  file: MockedFile;
}

export interface MockedFileSharedUrls {
  id: string;
  file: MockedFile;
  sharedUrl: MockedSharedUrl;
}

export interface MockedGroup {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MockedInteractionWithComment {
  id: string;
  reaction: "LIKE" | "DISLIKE";
  author: MockedUser;
  comment: MockedComment;
}

export interface MockedInteractionWithFile {
  id: string;
  reaction: "LIKE" | "DISLIKE";
  author: MockedUser;
  file: MockedFile;
}

export interface MockedSharedUrl {
  id: string;
  title: string;
  endAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MockedUserGroups {
  id: string;
  user: MockedUser;
  group: MockedGroup;
}

export interface MockedUserSharedUrls {
  id: string;
  user: MockedUser;
  sharedUrl: MockedSharedUrl;
}
