import { MyContext } from "./../../types/MyContext";
// import { MyContext } from "./../../types/MyContext";
import { isVendorAuth } from "./../../middleware/isAuth";
import { Offer } from "../../entities/Offer";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";

@Resolver()
export class FindVendorOffer {
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
}
