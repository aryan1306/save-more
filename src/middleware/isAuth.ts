import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/MyContext";

export const isUserAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("You are not Authenticated");
  }

  return next();
};
export const isVendorAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.vendorId) {
    throw new Error("You are not Authenticated");
  }

  return next();
};
