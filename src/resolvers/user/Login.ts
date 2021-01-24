import { MyContext } from "./../../types/MyContext";
import argon2 from "argon2";
import { User } from "./../../entities/User";
import { UserResponse } from "./UserResponse";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";

@InputType()
class LoginInput {
  @Field()
  phone: string;

  @Field()
  password: string;
}

@Resolver()
export class LoginResolver {
  @Mutation(() => UserResponse)
  async login(
    @Arg("data") data: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ phone: data.phone });
    if (!user) {
      return {
        errors: [
          {
            field: "phone",
            message: "That phone number doesn't exist",
          },
        ],
      };
    }
    const validate = await argon2.verify(user.password, data.password);
    if (!validate) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect Password",
          },
        ],
      };
    }
    req.session.userId = user.id;

    return { user };
  }
}
