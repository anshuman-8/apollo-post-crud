import express from "express";
import { success, error } from "consola";
import { ApolloServer, gql } from "apollo-server-express";
import { PORT, IN_PROD } from "./config";

// const PORT = 3000;

import {resolvers,typeDefs}   from './graphql';


const startApp = async () => {

  // initialize express application
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: !IN_PROD,
    context: {},
  });

  await apolloServer.start();

  // inject appolo server middleware to express app
  await apolloServer.applyMiddleware({ app }); // apply apollo server to express app, u can change the graphql path as {app,path: '/graphql'}

  app.listen({ port: PORT }, () =>
    success({
      message: `Server started at http://localhost:${PORT}`,
      badge: true,
    })
  );
};

startApp();
