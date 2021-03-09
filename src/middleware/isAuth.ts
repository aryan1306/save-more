import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/MyContext";

// Bearer [token]

// export const isUserAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
//   const authorization = context.req.headers["authorization"];
//   if (!authorization) {
//     throw new ApolloError("Not Authenticated");
//   }
//   try {
//     const token = authorization?.split(" ")[1];
//     const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
//     context.payload = payload as any;
//   } catch (error) {
//     console.log(error);
//     throw new ApolloError("Not Authenticated");
//   }

//   return next();
// };
export const isVendorAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.vendorId) {
    throw new Error("You are not Authenticated");
  }

  return next();
};
