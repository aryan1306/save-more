import { isVendorAuth } from "./../../middleware/isAuth";
import { VendorLoginInput } from "./VendorLoginInput";
import argon2 from "argon2";
import { Vendor } from "./../../entities/Vendor";
import { MyContext } from "src/types/MyContext";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { generatePhoneUniqueCode } from "../utils/generateUniqueCode";
import { sendConfirmation, verifyPhone } from "../utils/sendConfirmation";
import { sendEmailConfirmation } from "../utils/sendEmailConfirmation";
import { VendorInput } from "./VendorInput";
import { VendorResponse } from "./VendorResponse";
import { ApolloError } from "apollo-server-express";
import { redis } from "../../redis";

@Resolver()
export class VendorResolver {
  @Query(() => Vendor)
  @UseMiddleware(isVendorAuth)
  async me(@Ctx() { req }: MyContext): Promise<Vendor | ApolloError> {
    const vendor = await Vendor.findOne({ VendorId: req.session.vendorId });
    if (!vendor) {
      throw new ApolloError("Unauthorized");
    }
    return vendor;
  }
  @Mutation(() => Boolean)
  async confirmVendor(
    @Arg("phone") phone: string,
    @Arg("phoneToken") phoneToken: string,
    @Arg("emailToken") emailToken: string
  ): Promise<Boolean> {
    const res = await verifyPhone(phone, phoneToken);

    const emailUserId = await redis.get(emailToken);

    if (!res || !emailUserId) {
      return false;
    }

    await Vendor.update({ VendorId: emailUserId }, { isVerified: true });
    redis.del(emailToken);

    return true;
  }
  @Mutation(() => Boolean)
  logoutVendor(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(process.env.COOKIE_NAME!);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }

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

    await sendEmailConfirmation(
      data.email,
      await generatePhoneUniqueCode(vendor.VendorId),
      true
    );
    await sendConfirmation(data.phone);

    req.session.vendorId = vendor.VendorId;

    return { vendor };
  }
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
