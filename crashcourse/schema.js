import data from "./data.js";
export const typeDefs = `#graphql
    type Game {
        id:ID!
        title:String!
        platform:[String!]!
        reviews:[Review!]
    }
    type Review {
        id:ID!
        rating:Int!
        content:String!
        author_id:Author
        game_id:Game

    }
    type Author {
        id: ID!
        name:String!
        verified:Boolean!
    }
    

    type Query{
        getReview(id:ID!): Review
        getReviews: [Review]
        getGame(id:ID!):Game
        getGames: [Game]
        getAuthor(id:ID!):Author
        getAuthors: [Author]
    }

    type Mutation{
        addGame(game:addGameInput):Boolean
        updateGame(id:ID!,edits:updateGameInput):Game
    }

    input addGameInput{
        title:String!,
        platform:[String!]!
    }
    input updateGameInput{
        title:String,
        platform:[String!]
    }
`;

export const resolvers = {
  Review: {
    author_id: async (review) => {
      return data.authors.filter((author) => author.id === review.author_id)[0];
    },
    game_id: async (review) => {
      return data.games.filter((game) => game.id === review.game_id)[0];
    },
  },
  Game: {
    reviews: async (review) => {
      return data.reviews.filter((r) => r.id === review.game_id);
    },
  },
  Query: {
    getReviews: async () => {
      return data.reviews;
    },

    getGames: async () => {
      return data.games;
    },

    getAuthors: async () => {
      return data.authors;
    },
    getGame: async (parent, { id }) => {
      return data.games.find((value) => value.id === id);
    },
    getReview: async (parent, { id }) => {
      return data.reviews.find((value) => value.id === id);
    },
    getAuthor: async (parent, { id }) => {
      return data.authors.find((value) => value.id === id);
    },
  },
  Mutation: {
    addGame: async (_, { game }) => {
      console.log(game);
      data.games.push({ id: (Math.random() * 1000).toString(), ...game });
      return true;
    },
    updateGame: async (_, { id, edits }) => {
      const { title, platform } = edits;
      console.log(edits);
      if (title && platform) {
        data.games.forEach((g) => {
          if (g.id === id) {
            g.platform = [...platform];
            g.title = title;
            return g;
          } else {
            return g;
          }
        });
        return data.games.find((g) => g.id === id);
      }
      if (title) {
        data.games.forEach((g) => {
          if (g.id === id) {
            g.title = title;
            return g;
          } else {
            return g;
          }
        });

        return data.games.find((g) => g.id === id);
      }
      if (platform) {
        data.games.forEach((g) => {
          if (g.id === id) {
            g.platform = platform;
            return g;
          } else {
            return g;
          }
        });
        return data.games.find((g) => g.id === id);
      }
    },
  },
};
