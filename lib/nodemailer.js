"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function nodeMailer(email, subject, body) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.NM_USER,
      pass: process.env.NM_PASS,
    },
    secure:false,
    // here it goes
    tls: {rejectUnauthorized: false},
    debug:true
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.NM_USER, // sender address
    to: `${email}`, // list of receivers
    subject: `${subject}`, // Subject line
    text: `${body}`, // plain text body
    html: `${body}`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports = { nodeMailer };
