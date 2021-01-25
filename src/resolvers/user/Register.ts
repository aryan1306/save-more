import { sendEmailConfirmation } from "./../utils/sendEmailConfirmation";
import { MyContext } from "../../types/MyContext";
import { generateUniqueCode } from "./../utils/generateUniqueCode";
import { UserResponse } from "./UserResponse";
import { User } from "./../../entities/User";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { sendConfirmation } from "../utils/sendConfirmation";

@InputType()
class RegisterInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  password: string;
}

@Resolver()
export class UserRegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("data") data: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const existingUser = await User.findOne({
      phone: data.phone,
      email: data.email,
    });
    if (existingUser) {
      return {
        errors: [
          {
            field: "phone",
            message: "Phone/Email already exists",
          },
        ],
      };
    }

    //TODO add this to env
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
            message: "Please enter a valid 10-digit mobile number",
          },
        ],
      };
    }

    if (data.name.length < 2) {
      return {
        errors: [
          {
            field: "name",
            message:
              "Name length should be greater than or equal to 2 characters",
          },
        ],
      };
    }

    //TODO change to 8
    if (data.password.length < 3) {
      return {
        errors: [
          {
            field: "password",
            message: "Length of the password should be greater than 3",
          },
        ],
      };
    }

    let hashedPassword = await argon2.hash(data.password);

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
    }).save();

    await sendConfirmation(
      data.phone,
      await generateUniqueCode(user.id, false)
    );
    await sendEmailConfirmation(
      data.email,
      await generateUniqueCode(user.id, false),
      false
    );

    req.session!.userId = user.id;

    return { user };
  }
}
