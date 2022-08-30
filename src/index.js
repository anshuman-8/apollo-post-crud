import express from "express";
import mongoose from 'mongoose';
import * as AppModels from './models'
import { success, error } from "consola";
import { PORT, IN_PROD,DB } from "./config";
import {resolvers,typeDefs}   from './graphql';
import { ApolloServer } from "apollo-server-express";


const startApp = async () => {
  try{

    // initialize express application
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: !IN_PROD,
    // playground: true,
    context: {...AppModels},
  });

  await mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true});
  success(`Connected to MongoDB at: ${DB}`);

  await apolloServer.start();

  // inject appolo server middleware to express app
  await apolloServer.applyMiddleware({ app }); // apply apollo server to express app, u can change the graphql path as {app,path: '/graphql'}

  app.listen({ port: PORT }, () =>
    success({
      message: `Server started at http://localhost:${PORT}`,
      badge: true,
    })
  );
  }catch(err){
    error(err);
  }
};

startApp();
