require('dotenv').config();

const api_key = process.env.MAILGUN_KEY;
const domain = 'sandbox6d43ef59f63444cbaea72b05ee2ce1e4.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const data = {
  from: 'Excited User <sandbox6d43ef59f63444cbaea72b05ee2ce1e4.mailgun.org>',
  to: 'kevinly.yeg@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!'
};
mailgun.messages().send(data, function(error, body) {
  if (error) console.log(error);
  console.log(body);
});

console.log(api_key)
console.log(domain)
