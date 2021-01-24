import { User } from "./../../entities/User";
import { redis } from "./../../redis";
import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";

@ObjectType()
class ConfirmationError {
  @Field()
  message: string;
}

@Resolver()
export class ConfirmUser {
  @Mutation(() => Boolean)
  async confirmUser(
    @Arg("phoneToken") phoneToken: string,
    @Arg("emailToken") emailToken: string
  ): Promise<Boolean | ConfirmationError> {
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
