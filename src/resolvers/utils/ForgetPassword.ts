import { ApolloError } from "apollo-server-express";
import argon2 from "argon2";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Vendor } from "./../../entities/Vendor";
import { redis } from "./../../redis";
import { generateUniqueCode } from "./generateUniqueCode";
import { sendPasswordEmail } from "./sendEmailConfirmation";

// @ObjectType()
// class PasswordResponse {
//   @Field(() => [FieldError], { nullable: true })
//   errors?: FieldError[];

//   @Field(() => Vendor, { nullable: true })
//   vendor: Vendor;
// }

@Resolver()
export class ForgotPasswordResolver {
  @Query(() => String)
  test() {
    return "hello world";
  }

  @Mutation(() => Vendor)
  async forgotPassword(@Arg("email") email: string) {
    const vendor = await Vendor.findOne({ OrganizationEmail: email });
    if (!vendor) {
      throw new ApolloError("The email does not exist or is incorrect");
    }
    sendPasswordEmail(email, await generateUniqueCode(vendor.VendorId));
    return vendor;
  }
  @Mutation(() => Boolean)
  async confirmForgotPassword(
    @Arg("code") code: string,
    @Arg("password") password: string
  ) {
    const vId = await redis.get(code);
    if (!vId) {
      throw new ApolloError("Invalid OTP. Please check your OTP and try again");
    }
    const hashedPassword = await argon2.hash(password);
    await Vendor.update({ VendorId: vId }, { Password: hashedPassword });
    return true;
  }
}
