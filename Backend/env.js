import dotenv from 'dotenv';
dotenv.config();

const { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, SECRET } = process.env;

export { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, SECRET };
