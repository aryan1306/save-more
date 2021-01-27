import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "./../../entities/User";
import { redis } from "./../../redis";

// @ObjectType()
// class ConfirmationError {
//   @Field()
//   message: string;
// }

@Resolver()
export class ConfirmUser {
  @Mutation(() => Boolean)
  async confirmUser(
    @Arg("phoneToken") phoneToken: string,
    @Arg("emailToken") emailToken: string
  ): Promise<Boolean> {
    const userId = await redis.get(phoneToken);

    const emailUserId = await redis.get(emailToken);

    if (!userId || !emailUserId) {
      return false;
    }

    await User.update({ id: userId }, { isVerified: true });
    redis.del(phoneToken);
    redis.del(emailToken);

    return true;
  }
}
