import { Offer } from "./../../entities/Offer";
import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../user/UserResponse";

@ObjectType()
export class OfferResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Offer, { nullable: true })
  offer?: Offer;
}
