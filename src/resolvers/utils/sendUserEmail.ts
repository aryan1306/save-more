import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendUserEmail(code: string, email: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
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
    from: "Save More info@savemore.com", // sender address
    to: email, // list of receivers
    subject: "Email Confirmation for Account Creation", // Subject line
    html: `
      <h1 style="text-align: center">Welcome to Save More, We are delighted to have you onboard </h1>
      <p>Let's complete the last step in your registration</p>
      <code style="font-size=5rem">${code}</code>
      <p>remember to never share your OTP with anyone</p>
      <p>Regards</p>
      <p>Save More Team </p>
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
