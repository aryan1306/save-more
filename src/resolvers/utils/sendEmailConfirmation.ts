import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID);
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
    <code style="text-align: center; font-size: larger;">${code}</code>
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
