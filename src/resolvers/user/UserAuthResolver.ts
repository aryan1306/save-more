import { MyContext } from "./../../types/MyContext";
import { ApolloError } from "apollo-server-express";
import { hash, verify } from "argon2";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { sendUserEmail } from "../utils/sendUserEmail";
import { redis } from "./../../redis";
import { generateUniqueCode } from "./../utils/generateUniqueCode";
import { UserInput } from "./UserInput";
import { UserResponse } from "./UserResponse";

@Resolver()
export class UserAuthResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg("code") code: string): Promise<boolean> {
    const uId = await redis.get(code);
    if (!uId) {
      return false;
    }
    await User.update({ id: uId }, { isVerified: true });
    return true;
  }

  @Mutation(() => User)
  async userLogin(
    @Ctx() { req }: MyContext,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApolloError("This user does not exist");
    }
    if (!user.isVerified) {
      throw new ApolloError("Your email is not verified");
    }
    const validate = await verify(user.password, password);
    if (!validate) {
      throw new ApolloError("Incorrect Password");
    }
    req.session.userId = user.id;
    return user;
  }

  @Mutation(() => UserResponse)
  async userRegister(@Arg("data") data: UserInput): Promise<UserResponse> {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return {
        errors: [
          {
            field: "email",
            message: "User with this email already exists",
          },
        ],
      };
    }
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!data.email.match(reg)) {
      return {
        errors: [
          {
            field: "email",
            message: "Please enter a valid email",
          },
        ],
      };
    }
    if (data.phone.length < 10 || data.phone.length > 10) {
      return {
        errors: [
          {
            field: "phone",
            message: "Please enter a valid 10 digit mobile number",
          },
        ],
      };
    }
    if (data.password.length < 8) {
      return {
        errors: [
          {
            field: "password",
            message: "Length should be greater than 8 characters",
          },
        ],
      };
    }
    const hashedPassword = await hash(data.password);
    const user = await User.create({
      email: data.email,
      phone: data.phone,
      name: data.name,
      password: hashedPassword,
    }).save();

    await sendUserEmail(await generateUniqueCode(user.id), data.email);

    return { user };
  }
}
