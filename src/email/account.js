const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = ({ email, firstName, lastName }) => {
  const msg = {
    to: email,
    from: 'help@example.com', // Use the email address or domain you verified above
    subject: 'Thanks for joining in',
    html: `Welcome to the app, ${firstName} ${lastName}. Let us know how you get along with the app`,
  };
  sgMail.send(msg).then(() => {
    // eslint-disable-next-line no-console
    console.log('Email sent');
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
};

const sendCancelationEmail = ({ email, firstName, lastName }) => {
  const msg = {
    to: email,
    from: 'help@example.com', // Use the email address or domain you verified above
    subject: 'Sorry to see you go!',
    text: `Goodbye, ${firstName} ${lastName}. We hope to see you back sometime soon`,
  };
  sgMail.send(msg).then(() => {
    // eslint-disable-next-line no-console
    console.log('Email sent');
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
