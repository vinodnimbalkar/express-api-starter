const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = ({ email, firstName, lastName }) => {
  // eslint-disable-next-line no-console
  console.log(email, firstName);
  const msg = {
    to: email,
    from: 'help@example.com', // Use the email address or domain you verified above
    subject: 'Thanks for joining in',
    text: `Welcome to the app, ${firstName} ${lastName}. Let us know how you get along with the app`,
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msg);
};

const sendCancelationEmail = ({ email, firstName, lastName }) => {
  const msg = {
    to: email,
    from: 'help@example.com', // Use the email address or domain you verified above
    subject: 'Sorry to see you go!',
    text: `Goodbye, ${firstName} ${lastName}. We hope to see you back sometime soon`,
  };
  sgMail.send(msg);
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
