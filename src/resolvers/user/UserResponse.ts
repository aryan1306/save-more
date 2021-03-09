import { User } from "./../../entities/User";
import { FieldError } from "./../offer/OfferResponse";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
