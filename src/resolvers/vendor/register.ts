import argon2 from "argon2";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Vendor } from "./../../entities/Vendor";
import { MyContext } from "./../../types/MyContext";
import { VendorInput } from "./VendorInput";
import { VendorResponse } from "./VendorResponse";

@Resolver()
export class VendorRegisterResolver {
  @Mutation(() => VendorResponse)
  async VendorRegister(
    @Arg("data") data: VendorInput,
    @Ctx() { req }: MyContext
  ): Promise<VendorResponse> {
    const existingUser = await Vendor.findOne({
      OrganizationPhone: data.phone,
    });
    if (existingUser) {
      return {
        errors: [
          {
            field: "phone",
            message: "Phone number already exists",
          },
        ],
      };
    }
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!data.email.match(reg)) {
      return {
        errors: [
          {
            field: "email",
            message: "Please enter a valid email",
          },
        ],
      };
    }
    if (data.phone.length < 10 || data.phone.length > 10) {
      return {
        errors: [
          {
            field: "phone",
            message: "Please enter a valid 10-digit mobile number",
          },
        ],
      };
    }

    if (data.OrganizationName.length < 2) {
      return {
        errors: [
          {
            field: "OrganizationName",
            message:
              "Name length should be greater than or equal to 2 characters",
          },
        ],
      };
    }

    //TODO change to 8
    if (data.password.length < 8) {
      return {
        errors: [
          {
            field: "password",
            message: "Length of the password should be greater than 3",
          },
        ],
      };
    }

    let hashedPassword = await argon2.hash(data.password);

    const vendor = await Vendor.create({
      OrganizationName: data.OrganizationName,
      OrganizationEmail: data.email,
      Address: data.Address,
      City: data.City,
      OrganizationPhone: data.phone,
      VendorName: data.VendorName,
      Password: hashedPassword,
    }).save();

    req.session.vendorId = vendor.VendorId;

    return { vendor };
  }
}
