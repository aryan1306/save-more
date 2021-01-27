import { Field, InputType } from "type-graphql";

@InputType()
export class OfferInput {
  @Field()
  title: string;

  @Field()
  ValidFrom: Date;

  @Field({ nullable: true })
  ValidTo: Date;

  @Field()
  category: string;

  @Field({ nullable: true })
  OfferCode: string;

  @Field(() => [String])
  ValidCities: string[];

  @Field(() => [String])
  OfferTerms: string[];
}
