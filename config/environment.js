require('dotenv').config()

module.exports = {
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    PORT: process.env.PORT
}