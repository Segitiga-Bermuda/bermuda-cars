const bcrypt = require('bcrypt'),
    hashPassword = async password => {
        const hash = await bcrypt
            .hash(password, 10)
            .then(hash => hash)

        return hash
    }

module.exports = hashPassword