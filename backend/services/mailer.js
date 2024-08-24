const nodemailer = require("nodemailer");
const fs = require("fs");

function get(obj, desc) {
  var arr = desc.split(".");
  while (arr.length && (obj = obj[arr.shift()]));
  return obj;
}

function replaceTokens(HTML, replacements) {
  return HTML.replace(/{{(.*?)}}/g, function (match, token) {
    var symbol = token.trim();
    return get(replacements, symbol);
  });
}

const sendEmail = async (email, subject, message, link) => {
  try {
    let transporter = nodemailer.createTransport({
      host: `${process.env.EMAILHOST}`,
      port: `${process.env.SMTPPORT}`,
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EMAILPASSWORD}`,
      },
      secureConnection: false,
      tls: { ciphers: "SSLv3" },
    });

    const htmlTemplate = await fs.promises.readFile(
      "services/email_template.html",
      "utf-8"
    );

    const htmlContent = replaceTokens(htmlTemplate, { subject, message, link });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.log("Error sending the email: ", error);
  }
};

module.exports = { sendEmail };
