import express from "express";
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
  console.log("je suis dans la route post files", req.files);
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

export default router;
