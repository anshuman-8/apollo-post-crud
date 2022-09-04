import {join} from 'path';
import express from "express";
import mongoose from 'mongoose';
import * as AppModels from './models'
import { success, error } from "consola";
import { PORT, IN_PROD,DB } from "./config";
import {resolvers,typeDefs}   from './graphql';
import AuthMiddleware from './middlewares/auth';
import { ApolloServer } from "apollo-server-express";
// import { schemaDirectives } from './graphql/directives';


const startApp = async () => {
  try{

    // initialize express application
  const app = express();
  app.use(AuthMiddleware);
  app.use(express.static(join(__dirname,'./Uploads')))

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    // schemaDirectives,
    playground: !IN_PROD,
    context: ({req})=>{
      let {isAuth, user}=req;
      return{req,isAuth, user,...AppModels};
    },
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
