import { ApolloServer } from "@apollo/server";
import { User } from "./user";
// Set up Apollo Server
export const server = new ApolloServer({
  typeDefs: `
            ${User.typeDefs}
            type Query {
               ${User.queries}

            }

            type Mutation {
               ${User.mutations}

            }
        `,
  resolvers: {
    Query: {
      ...User.resolvers.queries,
    },
    Mutation: {
      ...User.resolvers.mutations,
    },
  },
});

// const typeDefs = `
//   type Book {
//     id: ID!
//     title: String!
//     author: String!
//   }

//   type Query {
//     books: [Book]
//   }

//   type Mutation {
//     addBook(title: String!, author: String!): Book
//   }
// `;

// const books = [
//   { id: "1", title: "The Hobbit", author: "J.R.R. Tolkien" },
//   { id: "2", title: "1984", author: "George Orwell" },
// ];

// const resolvers = {
//   Query: {
//     books: () => books,
//   },
//   Mutation: {
//     addBook: (_, { title, author }: { title: string; author: string }) => {
//       const newBook = {
//         id: String(books.length + 1),
//         title,
//         author,
//       };
//       books.push(newBook);
//       return newBook;
//     },
//   },
// };

// export const server = new ApolloServer({ typeDefs, resolvers });
