import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

async function init() {
  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs: `
    type Query {
      hello: String

      say(name:String) :String
    }`,
    resolvers: {
      Query: {
        hello: () => "Hello, world!",
        say: (_, { name }) => `how r u ${name}`,
      },
    },
  });

  //   start the server before everything
  await server.start();

  app.use(cors(), express.json());
  //   graphql route (after parser middleware)
  app.use("/graphql", expressMiddleware(server));

  app.get("/", (req, res) => {
    res.json({ message: "hii" });
  });

  app.listen(PORT, () => {
    console.log("server is running on port 8000");
  });
}

init();
