import { Vendor } from "./../../entities/Vendor";
import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../user/UserResponse";

@ObjectType()
export class VendorResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Vendor, { nullable: true })
  vendor?: Vendor;
}
