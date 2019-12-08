const {
    DATABASE_NAME,
    DATABASE_HOST,
    DATABASE_USER,
    DATABASE_PASSWORD
} = require('./environment')

module.exports = {
    development: {
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        host: DATABASE_HOST,
        dialect: 'mysql',
        operatorAliases: false
    },
    test: {
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        host: DATABASE_HOST,
        dialect: 'mysql',
        operatorAliases: false
    },
    production: {
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        host: DATABASE_HOST,
        dialect: 'mysql',
        operatorAliases: false
    }
}