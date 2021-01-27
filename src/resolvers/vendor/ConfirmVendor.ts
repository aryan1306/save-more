import { Vendor } from "./../../entities/Vendor";
import { Arg, Mutation, Resolver } from "type-graphql";
import { redis } from "./../../redis";

// @ObjectType()
// class ConfirmationVendorError {
//   @Field()
//   message: string;
// }

@Resolver()
export class ConfirmVendorEmail {
  @Mutation(() => Boolean)
  async confirmVendor(
    @Arg("phoneToken") phoneToken: string,
    @Arg("emailToken") emailToken: string
  ): Promise<Boolean> {
    const emailUserId = await redis.get(emailToken);
    const phoneUserId = await redis.get(phoneToken);

    if (!emailUserId || !phoneUserId) {
      return false;
    }

    await Vendor.update({ VendorId: emailUserId! }, { isVerified: true });
    redis.del(emailToken);
    redis.del(phoneToken);

    return true;
  }
}
