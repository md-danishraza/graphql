const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs: `
        type User {
          id: ID!
          name: String!
          username: String!
          email : String!
          phone : String!
          website : String!

        }
        type Todo {
          id: ID!
          title: String
          completed: Boolean
          user:User
        }
  
        type Query {
          getTodos: [Todo]
          getUsers: [User]
          getUser(id: ID!): User
        }
      `,
    resolvers: {
      Todo: {
        user: async (todo) =>
          (
            await axios.get(
              "https://jsonplaceholder.typicode.com/users/" + todo.userId
            )
          ).data,
      },
      Query: {
        getTodos: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
        getUsers: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
        getUser: async (parent, { id }) =>
          (await axios.get("https://jsonplaceholder.typicode.com/users/" + id))
            .data,
      },
    },
  });

  await server.start(); // Required before applying middleware

  app.use(cors());

  server.applyMiddleware({ app, path: "/graphql" });

  const PORT = 8000;
  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
