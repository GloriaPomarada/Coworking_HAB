import dotenv from 'dotenv';
dotenv.config();

const {
    PORT = 3001,
    DB_HOST = 'localhost',
    DB_USER = 'root',
    DB_PASSWORD = '7479268',
    DB_NAME = 'coworking_db',
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_APIKEY,
    JWT_SECRET = 'xsmtpsib-54923885e8a92c38ab4b7b5b6546146ea4329cef55a51be2ef2f8cc2023bdf3f-wA2fv3HXJVzDLsyZ',
    JWT_EXP = '7d',
    UPLOADS_DIR,
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
    UPLOADS_DIR, // =uploads
};
