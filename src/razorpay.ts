import { Razorpay } from "razorpay-typescript";

export const instance = new Razorpay({
  //TODO add to env
  authKey: {
    key_id: "rzp_test_awJVuXIKvKmk2t",
    key_secret: "6bqYOR39aawBbaKWlWIKBEcL",
  },
});
