import "reflect-metadata";
// import "dotenv-safe/config";
import { Agent } from "./entities/Agent";
import { Offer } from "./entities/Offer";
import { User } from "./entities/User";
import { Vendor } from "./entities/Vendor";
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
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
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
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost",
        "capacitor://localhost",
      ],
      credentials: true,
    })
  );
  app.use(
    session({
      name: process.env.COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        domain:
          process.env.NODE_ENV === "production"
            ? ".api-save-more.me"
            : undefined,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
      saveUninitialized: false,
      secret: process.env.SECRET!,
      resave: false,
    })
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [path.resolve(__dirname, "resolvers/**/*.*s")],
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

main().catch((err) => {
  console.error(err);
});
