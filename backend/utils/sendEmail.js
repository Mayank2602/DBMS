//to be able to send email via gmail i.e. to enable compatibility of nodemailer and gmail you need to turn on the allow less secure apps access in myaccount.google.com
//it is no longer availble therefore you cannot send email
const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {

    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL, //SMPT is simple mail tranfer protocol
            pass: process.env.SMPT_PASSWORD,
        }
    })

    const mailOptions = { //from userController.js file Line 84
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;