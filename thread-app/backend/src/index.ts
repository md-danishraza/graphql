import express from "express";

import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import { server } from "./graphql/index";
import UserService from "./services/user";
const app = express();
const PORT = process.env.PORT || 8000;

async function init() {
  // Start the server before everything
  await server.start();

  app.use(cors(), express.json());
  // GraphQL route (after parser middleware)
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        // @ts-ignore
        const token = req.headers["token"];

        try {
          const user = UserService.decodeJWTToken(token as string);
          return { user };
        } catch (error) {
          return {};
        }
      },
    })
  );

  app.get("/", (req, res) => {
    res.json({ message: "hii" });
  });

  app.listen(PORT, () => {
    console.log("server is running on port 8000");
  });
}

init();
