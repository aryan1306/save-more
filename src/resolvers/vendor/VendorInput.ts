import { InputType, Field } from "type-graphql";

@InputType()
export class VendorInput {
  @Field()
  OrganizationName: string;

  @Field()
  VendorName: string;

  @Field()
  Address: string;

  @Field()
  City: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  password: string;
}
