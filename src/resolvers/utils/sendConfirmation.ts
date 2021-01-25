const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require("twilio")(accountSid, authToken);

export const sendConfirmation = async (phone: string, code: string) => {
  const response = await client.messages.create({
    body: `${code} is your OTP for saveMore. Never share your OTP with anyone. This OTP will expire in a few minutes.`,
    from: "+14159910169",
    to: `+91${phone}`,
  });
  console.log(response);
};
