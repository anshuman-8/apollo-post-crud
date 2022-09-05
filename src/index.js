import { join } from "path";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import * as AppModels from "./models";
import { success, error } from "consola";
import { PORT, IN_PROD, DB } from "./config";
import { resolvers, typeDefs } from "./graphql";
import AuthMiddleware from "./middlewares/auth";
import { ApolloServer } from "apollo-server-express";
// import { schemaDirectives } from './graphql/directives';


const startApp = async () => {
  try {
    // initialize express application
    const app = express();
    app.use(AuthMiddleware);
    app.use(bodyParser.json());
    app.use(express.static(join(__dirname, "./Uploads")));

    // app.get('/post',async(req,res)=>{
    //   let {Post}=AppModels;
    //   let {page,limit} = req.query;

    //   const myCustomLabels = {
    //     totalDocs: 'postCount',
    //     docs: 'posts',
    //     limit: 'perPage',
    //     page: 'currentPage',
    //     nextPage: 'next',
    //     prevPage: 'prev',
    //     totalPages: 'pageCount',
    //     pagingCounter: 'slNo',
    //     meta: 'paginator',
    //   };

    //   const options = {
    //     page: page || 1,
    //     limit: limit || 10,
    //     customLabels: myCustomLabels,
    //   };

    //   let posts=await Post.paginate({}, options);

    //   return res.json(posts);

    // });

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      // schemaDirectives,
      playground: !IN_PROD,
      context: ({ req }) => {
        let { isAuth, user } = req;
        return { req, isAuth, user, ...AppModels };
      },
    });

    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
  } catch (err) {
    error(err);
  }
};

startApp();
