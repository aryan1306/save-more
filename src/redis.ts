import Redis from "ioredis";

export const redis = new Redis(
  process.env.NODE_ENV === "production"
    ? process.env.REDIS_URL
    : process.env.REDIS_LOCAL_URL
);
