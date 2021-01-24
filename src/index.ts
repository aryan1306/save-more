import "reflect-metadata";
// import { User } from "./entities/User";
import { LoginResolver } from "./resolvers/user/Login";
import { ConfirmUser } from "./resolvers/user/ConfirmUser";
import { RegisterResolver } from "./resolvers/user/Register";
import { createConnection } from "typeorm";
import Express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import connectRedis from "connect-redis";
import session from "express-session";
import { redis } from "./redis";

const main = async () => {
  await createConnection();
  // User.delete({ name: "test" });
  const app = Express();
  const RedisStore = connectRedis(session);
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: "qid",
      secret: "aslkdfjoiq12312",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RegisterResolver, ConfirmUser, LoginResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000/graphql");
  });
};

main();
