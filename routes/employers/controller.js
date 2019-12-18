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
                        role: 'Employer'
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


    updateOne:(req,res) => {
        try {
            Members.update(
                {
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password
            },
            {
                where: {
                    id: req.user.id,
                }
            }
            ).then(result => {
                res.send({
                    message:"Update Data",
                    data: result
                })
            })
        } catch (error) {
            console.log(error)
        }
    },

    updateAvatar:(req,res) => {
        try {
            Members.update(
                {
                avatarPath: req.body.avatarPath
            },
            {
                where: {
                    id: req.user.id,
                }
            }
            ).then(result => {
                res.send({
                    message:"Update Avatar",
                    data: result
                })
            })
        } catch (error) {
            console.log(error)
        }
    },
}