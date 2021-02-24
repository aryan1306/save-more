import { isVendorAuth } from "./../../middleware/isAuth";
import { Offer } from "./../../entities/Offer";
import { OfferInput } from "./OfferInput";
import { OfferResponse } from "./OfferResponse";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class EditOffer {
  @Mutation(() => OfferResponse)
  @UseMiddleware(isVendorAuth)
  async editOffer(@Arg("id") id: string, @Arg("data") data: OfferInput) {
    const offer = await Offer.findOne(id);
    if (!offer) {
      return null;
    }
    const updatedOffer = await Offer.update(
      { vendorId: id },
      { ...data, discountValue: parseFloat(data.discountValue) }
    );
    return updatedOffer;
  }
}
