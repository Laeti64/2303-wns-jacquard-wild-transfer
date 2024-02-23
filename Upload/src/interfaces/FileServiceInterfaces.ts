
import { User } from '../entities/User.entity';

export interface IFileToCreateService {
  title: string;
  description: string;
  format: string;
  duration: string;
  isPublic: boolean;
  url: string;
  author: Omit<User, "password">;
}

export interface IFileToUpdateService {
  title?: string;
  description?: string;
  format?: string;
  duration?: string;
  isPublic?: boolean;
  url?: string;
  author?: Omit<User, "password">;
}


