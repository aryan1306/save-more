// import { User } from "./entities/User";
// import { Offer } from "./entities/Offer";
// import { Vendor } from "./entities/Vendor";
import "reflect-metadata";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import Express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import connectRedis from "connect-redis";
import session from "express-session";
import { redis } from "./redis";

const main = async () => {
  dotenv.config();
  await createConnection();
  // User.delete({});
  // Vendor.delete({});
  // Offer.delete({});
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
      name: process.env.COOKIE_NAME!,
      secret: process.env.SECRET!,
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
      resolvers: [__dirname + "/resolvers/**/*.ts"],
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
