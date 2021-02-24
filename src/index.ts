import { Agent } from "./entities/Agent";
import { Offer } from "./entities/Offer";
import { User } from "./entities/User";
import { Vendor } from "./entities/Vendor";
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
import path from "path";

const main = async () => {
  dotenv.config();
  const conn = await createConnection({
    type: "postgres",
    url:
      process.env.NODE_ENV === "production"
        ? process.env.DATABASE_URL!
        : process.env.DATABASE_LOCAL_URL,
    logging: true,
    migrations: [path.join(__dirname, "./migration/*")],
    entities: [Offer, User, Vendor, Agent],
  });
  await conn.runMigrations();
  // User.delete({});
  // Vendor.delete({});
  // Offer.delete({});
  const app = Express();
  const RedisStore = connectRedis(session);
  app.set("proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN!,
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

  app.listen(parseInt(process.env.PORT!), () => {
    console.log("server started on localhost:4000/graphql");
  });
};

main();
