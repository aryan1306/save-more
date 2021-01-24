import { redis } from "./../../redis";

export const generateUniqueCode = async (userId: string) => {
  const token = Math.floor(1000 + Math.random() * 9000).toString();

  await redis.set(token, userId, "ex", 60 * 60 * 24);
  return token;
};
