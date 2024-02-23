import "dotenv/config";
import express from "express";
import { createConnection, getConnectionOptions } from "typeorm";
import fileRoutes from "./routes/File/FileRoutes";
import { loggingMiddleware } from "./middleware/RequestLog";
import { errorMiddleware } from "./middleware/errorMiddleware/errorMiddleware ";
import cors from "cors";

const app = express();
const port = 5005;

app.use(cors());


app.use(express.json());
app.use(loggingMiddleware);
app.use("/uploads", fileRoutes);
app.get("/", (req, res) => {
  res.send("<h1>Bienvenue sur ma page HTML</h1>");
});
app.use(errorMiddleware);

getConnectionOptions()
  .then((options) => {
    return createConnection({ ...options, name: "default" });
  })
  .then(async (connection) => {
    console.log("Connecté à la base de données avec succès");

    app.listen(port, () => {
      console.log(`Serveur lancé sur http://localhost:${port}`);
    });
  })
  .catch((error) =>
    console.log("Erreur de connexion à la base de données:", error)
  );
