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
                        'employerId',
                        'departement',
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
                            employerId = result[0].employerId,
                            departement = result[0].departement,
                            avatarPath = result[0].avatarPath,
                            role = result[0].role

                        if (decision) {
                            const token = jwt.sign(
                                {
                                    id,
                                    fullName,
                                    employerId,
                                    departement,
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
                                    avatarPath: 'https://cdn.filestackcontent.com/cache=false/output=secure:true/security=policy:eyJleHBpcnkiOiAxNTc2Njc5MTQzLCAiY2FsbCI6IFsicmVhZCIsICJzdGF0IiwgImNvbnZlcnQiLCAicGljayIsICJzdG9yZSJdfQ==,signature:3cf70a18cc92dfaed9e031462833cfaab3c38cf368d624f146c6da6d5be850e6/Sqqb1MpHTWy0xontsAju',
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
    },

    updateEmail: async (req, res) => {
        try {
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
                        Members.update(
                            {
                                email: req.body.email
                            },
                            {
                                where: {
                                    id: req.user.id,
                                }
                            }
                        ).then(result => {
                            res.send({
                                message: "Update email.",
                                data: result
                            })
                        })
                    }
                })
        } catch (error) {
            console.log(error)
        }
    },
    updatePassword: async (req, res) => {
        try {
            const password = await hashPassword(req.body.password)

            await Members.update(
                {
                    password: password
                },
                {
                    where: {
                        id: req.user.id,
                    }
                }
            ).then(result => {
                res.send({
                    message: "Update password.",
                    data: result
                })
            })
        } catch (error) {
            console.log(error)
        }
    },
    updateAvatar: async (req, res) => {
        try {
            await Members.update(
                {
                    avatarPath: req.body.avatarPath
                },
                {
                    where: {
                        id: req.user.id,
                    }
                }
            ).then(result => {
                Members
                    .findAll({
                        where: {
                            id: req.user.id
                        },
                        attributes: [
                            'avatarPath'
                        ]
                    })
                    .then(result2 => {
                        res.status(200).send({
                            message: 'Update Avatar',
                            result2
                        })
                    })
            })
        } catch (error) {
            console.log(error)
        }
    },
    viewProfile: (req, res) => {
        if (req.user.role !== 'Admin') {
            res.send({
                message: 'You are not allowed to view other users profile.'
            })

            return null
        }

        Members
            .findAll(
                {
                    where: {
                        id: req.user.id
                    }
                },
                {
                    attributes: [
                        'fullName',
                        'born',
                        'gender',
                        'employerId',
                        'departement',
                        'role',
                        'avatarPath'
                    ]
                }
            )
            .then(result => {
                res.status(200).send({
                    result
                })
            })
    }
}