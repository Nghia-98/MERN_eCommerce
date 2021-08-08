import transporter from '../config/mailer.js';

export const createVerifyMailTemplate = (userName, token) => {
  return `
  Dear <b> ${userName} </b>, <br/>
  Thank you for registering with Proshop.

  <p> Please click this
  <a href="http://localhost:5000/api/users/account/verifyEmail/${token}"> link </a>
  to active your account. </p>
 
  Thank you! <br\>
  Have a pleasant day!
  `;
};

export const sendMail = (email, subject, mailTemplate) => {
  return transporter.sendMail({
    from: '"Proshop (NO REPLY)" <proshopmern8@gmail.com>', // sender address
    to: email, // list of receivers
    subject: subject,
    html: mailTemplate,
  });
};
