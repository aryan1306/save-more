// const accountSid = process.env.accountSid;
// const authToken = process.env.authToken;
// const client = require("twilio")(accountSid, authToken);

// export const sendConfirmation = async (phone: string) => {
//   let res = await client.verify
//     .services("VA228bc1cd5fc32a45ea2a7d8e7e3be4b6")
//     .verifications.create({ to: `+91${phone}`, channel: "sms" });
//   console.log(res);
// };

// export const verifyPhone = async (phone: string, code: string) => {
//   let res = await client.verify
//     .services("VA228bc1cd5fc32a45ea2a7d8e7e3be4b6")
//     .verificationChecks.create({ to: phone, code: code });
//   console.log(res);
//   return res.status;
// };
