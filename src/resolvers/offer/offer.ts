import { Offer } from "./../../entities/Offer";
import { isVendorAuth } from "./../../middleware/isAuth";
import { MyContext } from "src/types/MyContext";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { OfferInput } from "./OfferInput";
import { OfferResponse } from "./OfferResponse";
import { getConnection } from "typeorm";

@Resolver()
export class OfferResolver {
  @Query(() => [Offer])
  @UseMiddleware(isVendorAuth)
  async findMyOffers(@Ctx() { req }: MyContext): Promise<Offer[] | String> {
    const offers = await getConnection().query(
      `
      select o.*,
      json_build_object(
        'VendorId', v."VendorId",
        'OrganizationName', v."OrganizationName",
        'Address', v."Address",
        'OrganizationPhone', v."OrganizationPhone",
        'OrganizationEmail', v."OrganizationEmail"
        ) vendor
      from offer o 
      inner join vendor v on v."VendorId" = o."vendorId"
      where o."vendorId" = $1
      order by o."ValidFrom" DESC
    `,
      [req.session.vendorId]
    );
    if (!offers) {
      return "Seems like you have not created any offers";
    }
    return offers;
  }
  @Mutation(() => Boolean)
  async delOffer(@Arg("offerId") offerId: string) {
    await Offer.delete({ OfferId: offerId });
    return true;
  }

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
