import { Vendor } from "./../../entities/Vendor";
import { VendorResponse } from "./VendorResponse";
import { MyContext } from "./../../types/MyContext";
import argon2 from "argon2";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";

@InputType()
class VendorLoginInput {
  @Field()
  phone: string;

  @Field()
  password: string;
}

@Resolver()
export class VendorLoginResolver {
  @Mutation(() => VendorResponse)
  async vendorLogin(
    @Arg("data") data: VendorLoginInput,
    @Ctx() { req }: MyContext
  ): Promise<VendorResponse> {
    const vendor = await Vendor.findOne({ OrganizationPhone: data.phone });
    if (!vendor) {
      return {
        errors: [
          {
            field: "phone",
            message: "That phone number doesn't exist",
          },
        ],
      };
    }
    const validate = await argon2.verify(vendor?.Password, data.password);
    if (!validate) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect Password",
          },
        ],
      };
    }

    req.session.vendorId = vendor.VendorId;

    return { vendor };
  }
}
