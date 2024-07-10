import nodemailer from 'nodemailer';
import { sendEmailError } from '../services/errorService.js';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_APIKEY } from '../../env.js';


// Creamos un transporte para poder enviar emails con nodemailer.
const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_APIKEY,
    },
});

// Función que envía un mail a un usuario.
const sendMailUtil = async (email, subject, body) => {
    try {
        const mailOptions = {
            from: SMTP_USER,
            to: email,
            subject,
            text: body,
        };
        await transport.sendMail(mailOptions);
    } catch (error) {
        console.log(error)
        sendEmailError();
    }
};

export default sendMailUtil;
