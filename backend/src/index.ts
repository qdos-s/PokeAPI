import { createServer } from "node:http";
import dotenv from "dotenv";
import { createSchema, createYoga } from "graphql-yoga";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { resolvers } from "./resolvers";
dotenv.config();

const typeDefs = loadSchemaSync("**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  graphiql: {
    defaultQuery: `
      query {
        pokemons {
          count
          next
          previous
          results
        }
      }
    `,
  },
});

const server = createServer(yoga);

server.listen(process.env.PORT, () => {
  console.log(
    `GraphQL server running at: http://localhost:${process.env.PORT}`,
  );
});
