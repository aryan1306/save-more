import { Field, InputType } from "type-graphql";

@InputType()
export class OfferInput {
  @Field()
  title: string;

  @Field()
  ValidFrom: Date;

  @Field()
  ValidTo: Date;

  @Field()
  offerType: string;

  @Field({ nullable: true })
  discountValue: string;

  @Field({ nullable: true })
  imgURL: string;

  @Field()
  category: string;

  @Field({ nullable: true })
  OfferCode: string;

  @Field(() => [String])
  ValidCities: string[];

  @Field(() => String)
  OfferTerms: string;
}
