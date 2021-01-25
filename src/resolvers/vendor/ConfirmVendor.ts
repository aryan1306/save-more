import { User } from "./../../entities/User";
import { redis } from "./../../redis";
import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";

@ObjectType()
class ConfirmationError {
  @Field()
  message: string;
}

@Resolver()
export class ConfirmVendor {
  @Mutation(() => Boolean)
  async confirmUser(
    @Arg("phoneToken") phoneToken: string,
    @Arg("emailToken") emailToken: string
  ): Promise<Boolean | ConfirmationError> {
    const userId = await redis.get(
      process.env.VENDOR_PHONE_PREFIX + phoneToken
    );

    const emailUserId = await redis.get(
      process.env.VENDOR_EMAIL_PREFIX + emailToken
    );

    if (!userId || !emailUserId) {
      return {
        message: "The code is expired or invalid",
      };
    }

    await User.update({ id: userId }, { isVerified: true });
    redis.del(phoneToken);
    redis.del(emailToken);

    return true;
  }
}
