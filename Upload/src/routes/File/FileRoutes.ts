import express from "express";
import * as FileController from "../../controllers/File/FileController";
import { uploadMiddleware } from "../../middleware/uploadMiddleware";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import archiver from "archiver";

const ffmpegPath = require("ffmpeg-static");
const ffprobePath = require("ffprobe-static").path;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const router = express.Router();

router.post("/files", uploadMiddleware, async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("Aucun fichier n'a été fourni.");
  }

  const fileDataArray: any[] = [];
  const filesLength = req.files.length as number;
  const files: Record<number | string, Express.Multer.File> = req.files as any;

  // Utilisez une boucle pour traiter chaque fichier
  for (let i = 0; i < filesLength; i++) {
    const file = files[i];
    const filePath = file.path;
    const fileName = file.filename;

    try {
      await new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, async (err, metadata) => {
          if (err) {
            console.error("Erreur avec ffprobe:", err);
            return res
              .status(500)
              .send(
                "Erreur lors de la récupération des métadonnées du fichier."
              );
          }

          const duration = metadata.format.duration
            ? metadata.format.duration.toString()
            : "0";
          const format = metadata.format.format_name || "inconnu";

          const fileData = {
            title: req.body.title[i],
            description: req.body.description[i],
            isPublic: req.body.isPublic[i],
            authorUsername: req.body.author[i],
            url: fileName,
            duration,
            format,
          };

          fileDataArray.push(fileData);
          resolve(null);
        });
      });
    } catch (ffmpegError) {
      console.error("Erreur avec ffmpeg:", ffmpegError);
      return res
        .status(500)
        .send("Erreur lors du traitement du fichier avec ffmpeg.");
    }
  }

  try {
    return res.json(fileDataArray);
  } catch (error) {
    console.error(
      "Erreur lors de l'enregistrement des fichiers en base de données:",
      error
    );
    return res
      .status(500)
      .send("Erreur lors de l'enregistrement des fichiers en base de données.");
  }
});

router.get("/files/public", async (req, res) => {
  try {
    const files = await FileController.getAllPublicFiles();
    console.log("Fichiers récupérés : ", files); // Log pour débogage
    res.json(files);
  } catch (error) {
    console.error("Erreur spécifique : ", error); // Log pour débogage
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des fichiers.", error });
  }
});

router.get("/files/author/:id", async (req, res) => {
  const authordId = req.params.id;
  try {
    const files = await FileController.getFilesByUserId(authordId);
    console.log("Fichiers récupérés : ", files);
    res.json(files);
  } catch (error) {
    console.error("Erreur spécifique : ", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des fichiers.", error });
  }
});
router.get("/files", async (req, res) => {
  try {
    const files = await FileController.getAllFiles();

    const archive = archiver("zip");

    archive.on("end", function () {
      console.log("Archive terminée.");
    });

    res.attachment("files.zip");

    archive.pipe(res);

    for (const file of files) {
      archive.file(path.resolve(file.url), { name: path.basename(file.url) });
    }

    archive.finalize();
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la récupération des fichiers.");
  }
});

router.get("/files/:id", async (req, res) => {
  try {
    const filePath = await FileController.getFilePathById(req.params.id);
    if (filePath) {
      res.sendFile(path.resolve(filePath));
    } else {
      res.status(404).send("Fichier non trouvé.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la récupération du fichier.");
  }
});

router.put("/files/:id", async (req, res) => {
  const file = await FileController.updateFile(req.params.id, req.body);
  if (file) {
    res.json(file);
  } else {
    res.status(404).send("Fichier non trouvé.");
  }
});

router.delete("/files/:id", async (req, res) => {
  await FileController.deleteFile(req.params.id);
  res.json({ message: "File deleted successfully" });
});

router.get("/files/search", async (req, res) => {
  const query = req.query.q;

  if (typeof query !== "string") {
    return res.status(400).send("Requête de recherche non valide.");
  }

  if (!query) {
    return res.status(400).send("Aucune requête de recherche fournie.");
  }

  try {
    const files = await FileController.searchFiles(query);
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la recherche des fichiers.");
  }
});

router.get("/files/:id/comments", async (req, res) => {
  try {
    const comments = await FileController.getFileComments(req.params.id);
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la récupération des commentaires.");
  }
});

router.post("/files/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { text, authorId } = req.body;

  if (!text || !authorId) {
    return res.status(400).send("Données de commentaire incomplètes.");
  }
  try {
    const comment = await FileController.addFileComment(id, text, authorId);
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'ajout du commentaire.");
  }
});

export default router;
