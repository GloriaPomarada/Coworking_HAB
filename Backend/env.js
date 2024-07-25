import dotenv from 'dotenv';
dotenv.config();

const {
    PORT = ' 3001',
    DB_HOST = 'localhost',
    DB_USER = 'root',
    DB_PASSWORD = '7479268',
    DB_NAME = 'coworking_db',
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_APIKEY,
    JWT_SECRET = 'aldjkfbladksjcbsadkjbcvszakjcb',
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
