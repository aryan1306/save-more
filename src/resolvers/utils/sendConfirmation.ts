const accountSid = "AC143b83f846abd4d3d81f3bb555fc6c2c";
const authToken = "df4f8fb98b3b8cca2b3409dba261d9c4";
const client = require("twilio")(accountSid, authToken);

export const sendConfirmation = async (phone: string, code: string) => {
  const response = await client.messages.create({
    body: `${code} is your OTP for saveMore`,
    from: "+14159910169",
    to: `+91${phone}`,
  });
  console.log(response);
};
