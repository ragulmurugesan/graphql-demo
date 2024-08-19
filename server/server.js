import cors from 'cors';
import express from 'express';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { authMiddleware, handleLogin } from './auth.js';
import { resolvers } from './resolvers.js';
import { ApolloServer } from '@apollo/server';
import { readFile } from "node:fs/promises";

const PORT = 9000;

const app = express();

// Middleware setup
app.use(cors(), express.json(), authMiddleware);

// Login route
app.post('/login', handleLogin);

 // Read GraphQL schema
const typeDefs = await readFile("./schema.graphql", 'utf8');

// Create Apollo Server instance
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();

function getContext({ req }) {
  console.log('show req ', req.auth);
  return { weather: 'cold' };
}

// Apply Apollo Server middleware
app.use("/graphql", apolloMiddleware(apolloServer, { context: getContext }));

// Start Express Server
app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
