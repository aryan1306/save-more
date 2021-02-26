import { Field, InputType } from "type-graphql";

@InputType()
export class VendorLoginInput {
  @Field()
  phone: string;

  @Field()
  password: string;
}
