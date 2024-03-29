import sgMail from "@sendgrid/mail";

sgMail.setApiKey(
  "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"
);
export const sendEmailConfirmation = (
  email: string,
  code: string,
  isVendor: boolean
) => {
  const msg = {
    to: email, // Change to your recipient
    from: "info@savemore.tech", // Change to your verified sender
    subject: isVendor
      ? "Confirmation Email for Save More Business Registration"
      : "Confirmation Email for Save More Customer Registration",
    html: `<h1 style="text-align: center;">We Are Delighted to have you onboard!</h1>
    <p>please use this OTP to confirm your email </p>
    <code style="text-align: center; font-size: 5rem;">${code}</code>
    <p>Never share your OTP with anyone</p>
    <p>Regards</p>
    <p>Save More Team</p>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
export const sendPasswordEmail = (email: string, code: string) => {
  const pMsg = {
    to: email,
    from: "info@savemore.tech",
    subject: "OTP to Reset Password for SaveMore Business",
    html: `<h1 style="text-align: center;">Please use the OTP below to reset your Password</h1>
    <code style="font-size: 5rem;">${code}</code>
    <p>Never share your OTP with anyone</p>
    <p>Regards</p>
    <p>Save More Team</p>`,
  };
  sgMail
    .send(pMsg)
    .then(() => {
      console.log("Password Email sent");
    })
    .catch((err) => {
      console.error(err);
    });
};
