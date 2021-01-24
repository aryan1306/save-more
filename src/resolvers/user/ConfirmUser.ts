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
    @Arg("token") token: string
  ): Promise<Boolean | ConfirmationError> {
    const userId = await redis.get(token);

    if (!userId) {
      return false;
    }

    await User.update({ id: userId }, { isVerified: true });
    redis.del(token);

    return true;
  }
}
