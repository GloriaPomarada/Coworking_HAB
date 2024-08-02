import dotenv from 'dotenv';
dotenv.config();

const {
    PORT = '8000',
    DB_HOST = 'localhost',
    DB_USER = 'root',
    DB_PASSWORD = '7479268',
    DB_NAME = 'coworking_db',
    SMTP_HOST = 'smtp-relay.brevo.com',
    SMTP_PORT = '587',
    SMTP_USER = 'medranoisaul5@gmail.com',
    SMTP_APIKEY = 'xsmtpsib-54923885e8a92c38ab4b7b5b6546146ea4329cef55a51be2ef2f8cc2023bdf3f-FcHkRGd3VCNK9DqQ',
    JWT_SECRET = 'ACCESDEFINEDBYTHEPROJECT',
    JWT_EXP = '7d',
    UPLOADS_DIR,
    CLIENT_URL = 'http://localhost:3000',
} = process.env;

export {
    PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_APIKEY,
    JWT_SECRET,
    JWT_EXP,
    UPLOADS_DIR,
    CLIENT_URL,
};
