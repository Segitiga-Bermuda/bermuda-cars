const { Members } = require('../../db/models'),
    {
        JWT_SECRET_KEY
    } = require('../../config'),
    {
        hashPassword,
        comparePassword
    } = require('../../helpers'),
    jwt = require('jsonwebtoken')

module.exports = {
    logIn: async (req, res) => {
        try {
            await Members
                .findAll({
                    where: {
                        email: req.body.email,
                        role: 'Admin'
                    },
                    attributes: [
                        'id',
                        'fullName',
                        'password',
                        'avatarPath',
                        'role'
                    ]
                })
                .then(async result => {
                    if (result.length > 0) {
                        const decision = await comparePassword(req.body.password, result[0].password),
                            id = result[0].id,
                            fullName = result[0].fullName,
                            avatarPath = result[0].avatarPath,
                            role = result[0].role

                        if (decision) {
                            const token = jwt.sign(
                                {
                                    id,
                                    fullName,
                                    avatarPath,
                                    role
                                },
                                JWT_SECRET_KEY,
                                {
                                    expiresIn: '1d'
                                }
                            )

                            res.send({
                                token
                            })
                        } else {
                            res.send({
                                message: 'Email or password is wrong!'
                            })
                        }
                    } else {
                        res.send({
                            message: 'Email or password is wrong!'
                        })
                    }
                })
        } catch (error) {
            console.log(error)
        }
    },
    register: async (req, res) => {
        try {
            if (req.user.role === 'Admin') {
                await Members
                    .findAll({
                        where: {
                            email: req.body.email
                        }
                    })
                    .then(async result => {
                        if (result.length > 0) {
                            res.send({
                                message: 'Email have been used!'
                            })
                        } else {
                            const password = await hashPassword(req.body.password)

                            Members
                                .create({
                                    id: null,
                                    fullName: req.body.fullName,
                                    born: req.body.born,
                                    gender: req.body.gender,
                                    employerId: req.body.employerId || 'None',
                                    departement: req.body.departement || 'None',
                                    email: req.body.email,
                                    password: password,
                                    role: req.body.role,
                                    avatarPath: './assets/images/person.png',
                                    createdAt: null,
                                    updatedAt: null
                                })
                                .then(result => {
                                    res.send({
                                        message: 'User is successfully added.'
                                    })
                                })
                        }
                    })
            } else {
                res.send({
                    message: 'Just admin allowed to register new account.'
                })
            }
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                res.send({
                    message: 'You must log in again!'
                })

                return null
            }

            console.log(error)
        }
    }
}