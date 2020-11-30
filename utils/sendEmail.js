require('dotenv').config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmails(to, from, subject, text){
  const msg = {
    to,
    from,
    subject,
    text
  };
  sgMail.send(msg, function(err, result) {
    if (err) {
      console.log("Not Sent");
    } else {
      console.log('Email sent');
  };
});

module.exports = sendEmails;

};
