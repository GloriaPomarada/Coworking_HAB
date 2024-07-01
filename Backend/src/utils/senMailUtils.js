import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from '../../env';
// Creamos un transporte para poder enviar emails con nodemailer.
const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

// Función que envía un mail a un usuario.
const sendMailUtil = async (email, subject, body) => {
    try {
        const mailOptions = {
            from: 'maddison53@ethereal.email',
            to: email,
            subject,
            text: body,
        };

        await transport.sendMail(mailOptions);
    } catch (err) {
        console.error(err);
        sendEmailError();
    }
};

export default sendMailUtil;
