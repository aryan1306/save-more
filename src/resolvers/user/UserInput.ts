import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  password: string;
}
