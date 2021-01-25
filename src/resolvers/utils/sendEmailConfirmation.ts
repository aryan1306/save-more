import nodemailer from "nodemailer";

export const sendEmailConfirmation = async (
  email: string,
  code: string,
  isVendor: boolean
) => {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: email,
    subject: isVendor
      ? "Confirmation Email for Save More Partner Registration"
      : "Confirmation Email for Save More Customer Registration",
    html: `<h1 style="text-align: center;">We Are Delighted to have you onboard</h1>
    <p>please use this OTP to confirm your email </p>
    <code style="text-align: center; font-size: larger;">${code}</code>
    <p>Never share your OTP with anyone</p>`,
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
