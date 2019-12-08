const bcrypt = require('bcrypt'),
    comparePassword = async (plainPassword, hashPassword) => {
        const compared = await bcrypt
            .compare(plainPassword, hashPassword)
            .then(result => result)

        return compared
    }

module.exports = comparePassword