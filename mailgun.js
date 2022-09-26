// require('dotenv').config();

var api_key = '200d172f218914dafe706b0f76cf7de9-4534758e-10a30560';
var domain = 'sandbox435f264b8c1f44b4bab425fba824c558.mailgun.org';
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

// var data = {
//   from: 'Excited User <Admin@sandbox435f264b8c1f44b4bab425fba824c558.mailgun.org>',
//   to: 'kevinly.yeg@gmail.com',
//   subject: 'Hello World',
//   text: 'Testing some Mailgun awesomness!'
// };
// mailgun.messages().send(data, function(error, body) {
//   if (error) console.log(error);
//   console.log(body);
// });

console.log(api_key);
console.log(domain);







// var postmark = require("postmark");
// var client = new postmark.ServerClient("server token");

// client.sendEmail({
//     "From": "sender@example.com",
//     "To": "receiver@example.com",
//     "Subject": "Test",
//     "TextBody": "Hello from Postmark!"
// });







