import { MyContext } from "./../../types/MyContext";
import { Offer } from "./../../entities/Offer";
import { isVendorAuth } from "./../../middleware/isAuth";
import { OfferInput } from "./OfferInput";
import { OfferResponse } from "./OfferResponse";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class CreateOfferResolver {
  @Mutation(() => OfferResponse)
  @UseMiddleware(isVendorAuth)
  async createOffer(
    @Arg("data") data: OfferInput,
    @Ctx() { req }: MyContext
  ): Promise<OfferResponse> {
    if (!data.title) {
      return {
        errors: [
          {
            field: "title",
            message: "Title cannot be empty",
          },
        ],
      };
    }
    if (data.offerType == "Discount" && !data.discountValue) {
      return {
        errors: [
          {
            field: "discountValue",
            message: "Discount value cannot be empty if Discount is selected",
          },
        ],
      };
    }
    if (data.ValidTo) {
      if (data.ValidFrom > data.ValidTo) {
        return {
          errors: [
            {
              field: "ValidTo",
              message: "Valid To Date should be greater than Valid From Date",
            },
          ],
        };
      }
      const offer = await Offer.create({
        ...data,
        discountValue: parseFloat(data.discountValue),
        vendorId: req.session.vendorId,
      }).save();
      return { offer };
    }
    const offer = await Offer.create({
      ...data,
      discountValue: parseFloat(data.discountValue),
      vendorId: req.session.vendorId,
    }).save();
    return { offer };
  }
}
