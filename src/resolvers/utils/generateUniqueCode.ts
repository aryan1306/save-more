import { redis } from "./../../redis";

export const generateUniqueCode = async (userId: string, isVendor: boolean) => {
  const token = Math.floor(1000 + Math.random() * 9000).toString();

  await redis.set(
    !isVendor
      ? process.env.USER_EMAIL_PREFIX!
      : process.env.VENDOR_EMAIL_PREFIX! + token,
    userId,
    "ex",
    60 * 60 * 24
  );
  return token;
};

export const generatePhoneUniqueCode = async (
  userId: string,
  isVendor: boolean
) => {
  const token = Math.floor(1000 + Math.random() * 9000).toString();

  await redis.set(
    !isVendor
      ? process.env.USER_PHONE_PREFIX!
      : process.env.VENDOR_PHONE_PREFIX! + token,
    userId,
    "ex",
    60 * 60 * 24
  );
  return token;
};
