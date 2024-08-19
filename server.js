import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import express from 'express';

const typeDefs = `#graphql
    schema {
        query: Query
    }

    type Query {
        greeting: String
    }
`;

const resolvers = {
    Query: {
        greeting: () => 'Hello World'
    }
}

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 9000 } });
console.log('Server running at ', url);