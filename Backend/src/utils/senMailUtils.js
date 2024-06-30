import nodemailer from 'nodemailer';

// Creamos un transporte para poder enviar emails con nodemailer.
const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 465,
    auth: {
        user: 'maddison53@ethereal.email',
        pass: 'jn7jnAPss4f63QBp6D',
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
