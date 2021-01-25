import { MyContext } from "./../../types/MyContext";
import { Vendor } from "./../../entities/Vendor";
import { VendorResponse } from "./VendorResponse";
import { Mutation, Resolver, Arg, Ctx } from "type-graphql";
import argon2 from "argon2";
import { generateUniqueCode } from "../utils/generateUniqueCode";
import { sendConfirmation } from "../utils/sendConfirmation";
import { sendEmailConfirmation } from "../utils/sendEmailConfirmation";
import { VendorInput } from "./VendorInput";

@Resolver()
export class VendorRegisterResolver {
  @Mutation(() => VendorResponse)
  async VendorRegister(
    @Arg("data") data: VendorInput,
    @Ctx() { req }: MyContext
  ): Promise<VendorResponse> {
    const existingUser = await Vendor.findOne({
      OrganizationPhone: data.phone,
      OrganizationEmail: data.email,
    });
    if (existingUser) {
      return {
        errors: [
          {
            field: "email",
            message: "Phone/email already exists",
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
            field: "name",
            message:
              "Name length should be greater than or equal to 2 characters",
          },
        ],
      };
    }

    //TODO change to 8
    if (data.password.length < 3) {
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

    if (!data.isPartner) {
      const vendor = await Vendor.create({
        OrganizationName: data.OrganizationName,
        Address: data.Address,
        AddressURL: data.Address,
        City: data.City,
        OrganizationEmail: data.email,
        OrganizationPhone: data.phone,
        Password: hashedPassword,
        VendorName: data.VendorName,
      }).save();
      await sendConfirmation(
        data.phone,
        await generateUniqueCode(vendor.VendorId, true)
      );
      await sendEmailConfirmation(
        data.email,
        await generateUniqueCode(vendor.VendorId, true),
        true
      );
      req.session.vendorId = vendor.VendorId;
      return { vendor };
    }
    const code = Math.round(1000 + Math.random() * 9000).toString();
    const vendor = await Vendor.create({
      OrganizationName: data.OrganizationName,
      Address: data.Address,
      AddressURL: data.AddressURL,
      City: data.City,
      OrganizationEmail: data.email,
      OrganizationPhone: data.phone,
      Password: hashedPassword,
      VendorName: data.VendorName,
      VendorCode: code,
    }).save();
    await sendConfirmation(
      data.phone,
      await generateUniqueCode(vendor.VendorId, true)
    );
    await sendEmailConfirmation(
      data.email,
      await generateUniqueCode(vendor.VendorId, true),
      false
    );

    req.session.vendorId = vendor.VendorId;

    return { vendor };
  }
}
