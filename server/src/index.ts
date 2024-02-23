import "reflect-metadata";
import { buildSchema } from "type-graphql";
import path from "path";
import express from "express";
import http from "http";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServer } from "@apollo/server";
import dataSource from "./lib/dataSource";
import { UserResolver } from "./resolvers/user.resolver";
import { FileResolver } from "./resolvers/file.resolver";
import { CommentResolver } from "./resolvers/comment.resolver";
import { SharedUrlResolver } from "./resolvers/sharedUrl.resolver";
import { InteractionResolver } from "./resolvers/interaction.resolver";

interface MyContext {}
import { UserSharedUrlResolver } from "./resolvers/userSharedUrl.resolver";
import { EmojiResolver } from "./resolvers/emoji.resolver";

const app = express();

app.use(cors());

app.get("/download/:id", async (req, res) => {
  try {
    const file = await db.findOne({
      where: { id: req.params.id },
    });

    if (!file) {
      return res.status(404).send("File not found");
    }

    const filePath = path.join(__dirname, "../../", file.url);
    res.download(filePath, file.title);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

const httpServer = http.createServer(app);
const db = dataSource.getRepository("File");
const port = process.env.PORT || 4000;

async function main() {
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      FileResolver,
      CommentResolver,
      SharedUrlResolver,
      InteractionResolver,
      UserSharedUrlResolver,
      EmojiResolver,
    ],
    validate: false,
  });
  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/",
    cors<cors.CorsRequest>({ origin: "*" }),
    express.json(),
    expressMiddleware(server, {
      // context: async ({
      //   req,
      // }: {
      //   req: express.Request;
      // }): Promise<{ user: User | null }> => {
      //   let user = null;
      //   const payload = (await new UserService().getAndCheckToken(
      //     req.headers.authorization
      //   )) as UserWithToken;
      //   if (payload) {
      //     user = await new UserService().getUserByEmail(payload.user.email);
      //   }
      //   return { user };
      // },
      apolloServer: {
        disableHealthCheck: true,
      },
    } as any)
  );

  await dataSource.initialize();
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server lancé sur http://localhost:${port}/`);
}

main();
