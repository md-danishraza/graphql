import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import { prismaClient } from "./lib/db";

const app = express();
const PORT = process.env.PORT || 8000;

async function init() {
  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs: `
    type Query {
      hello: String
      say(name: String): String
    }
      
    type Mutation {
      createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
    }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello, world!",
        say: (_, { name }) => `how r u ${name}`,
      },
      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            lastName,
            email,
            password,
          }: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          }
        ) => {
          await prismaClient.user.create({
            data: {
              email,
              firstName,
              lastName,
              password,
              salt: "random_salt",
            },
          });
          return true;
        },
      },
    },
  });

  // Start the server before everything
  await server.start();

  app.use(cors(), express.json());
  // GraphQL route (after parser middleware)
  app.use("/graphql", expressMiddleware(server));

  app.get("/", (req, res) => {
    res.json({ message: "hii" });
  });

  app.listen(PORT, () => {
    console.log("server is running on port 8000");
  });
}

init();
