
import { getManager } from "typeorm";
import { File } from "../../entities/File.entity";
import { IFileToCreateService } from '../../interfaces/FileServiceInterfaces'
import { Comment } from "../../entities/Comment.entity";

export const createFile = async (fileData: IFileToCreateService) => {
  const fileRepository = getManager().getRepository(File);
  const newFile = fileRepository.create(fileData);
  return await fileRepository.save(newFile);
};

export const getFilePathById = async (id: string) => {
  const fileRepository = getManager().getRepository(File);
  const file = await fileRepository.findOne({  where: { id: id },
  });
  return file ? file.url : null;
};


export const getAllFiles = async () => {
  const fileRepository = getManager().getRepository(File);
  return await fileRepository.find();
};

export const getAllByAuthorId = async (authorId: string) => {
  const fileRepository = getManager().getRepository(File);
  return await fileRepository.createQueryBuilder("file")
    .where("file.authorId = :authorId", { authorId })
    .getMany();
}

export const getFileById = async (id: string) => {
  const fileRepository = getManager().getRepository(File);
  return await fileRepository.findOne( {  where: { id: id },
  });
};

export const getFilesByUserId = async (userId: string) => {
  const fileRepository = getManager().getRepository(File);
  return await fileRepository.createQueryBuilder("file")
    .where("file.authorId = :userId", { userId })
  .getMany();
};


export const updateFile = async (id: string, fileData:IFileToCreateService) => {
  const fileRepository = getManager().getRepository(File);
  try {
    const updateResult = await fileRepository.update(id, fileData);
    if (updateResult.affected === 0) {
      throw new Error("No records were updated.");
    }
    const updatedFile = await fileRepository.findOne({ where: { id: id } });
    return updatedFile;
  } catch (error) {
    console.error("Error updating the file:", error);
    throw error;
  }
};

export const deleteFile = async (id: string) => {
  const fileRepository = getManager().getRepository(File);
  return await fileRepository.delete(id);
};

export const searchFiles = async (query: string) => {
  const fileRepository = getManager().getRepository(File);
  return await fileRepository.createQueryBuilder("file")
    .where("file.title LIKE :query OR file.description LIKE :query", { query: `%${query}%` })
    .getMany();
};


export const getFileComments = async (fileId: string) => {
  const commentRepository = getManager().getRepository(Comment);
  return await commentRepository.find({
    where: {
      file: { id: fileId }
    }
  });
};


export const addFileComment = async (fileId: string, text: string, authorId: string) => {
  const commentRepository = getManager().getRepository(Comment);

  const commentData = {
    content: text,
    file: { id: fileId },
    author: { id: authorId }
  };

  const newComment = commentRepository.create(commentData);

  return await commentRepository.save(newComment);
};

export const getAllPublicFiles = async () => {
  const fileRepository = getManager().getRepository(File);
  const files = await fileRepository.createQueryBuilder("file")
    .where("file.isPublic = :isPublic", { isPublic: true })
    .getMany();
  return files;
}
