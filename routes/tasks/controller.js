const { Tasks } = require('../../db/models'),
    jwt = require('jsonwebtoken'),
    {
        JWT_SECRET_KEY
    } = require('../../config')

module.exports = {
    getAll: (req, res) => {
        try {
            Tasks
                .findAll({})
                .then(result => {
                    res.status(200).send({
                        message: 'Get all datas.',
                        data: result
                    })
                })
        } catch (error) {
            console.log(error)
        }
    },
    getById: (req, res) => {
        try {
            Tasks
                .findAll({
                    where: {
                        userId: req.user.id
                    }
                })
                .then(result => {
                    res.send({
                        message: 'Get data by id.',
                        data: result
                    })
                })
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
    getCompleted: (req, res) => {
        try {
            Tasks
                .findAll({
                    where: {
                        userId: req.user.id,
                        status: 'completed'
                    }
                })
                .then(result => {
                    res.send({
                        message: 'Get completed datas.',
                        data: result
                    })
                })
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
    getUncompleted: (req, res) => {
        try {
            Tasks
                .findAll({
                    where: {
                        userId: req.user.id,
                        status: 'uncompleted'
                    }
                })
                .then(result => {
                    res.send({
                        message: 'Get uncompleted datas.',
                        data: result
                    })
                })
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
    deleteOne: (req, res) => {
        try {
            Tasks
                .update(
                    {
                        status: 'deleted'
                    },
                    {
                        where: {
                            id: parseInt(req.params.id),
                            userId: req.user.id
                        }
                    }
                )
                .then(result => {
                    Tasks
                        .findAll({
                            where: {
                                userId: req.user.id
                            }
                        })
                        .then(result2 => {
                            res.send({
                                message: 'Data is successfully deleted.',
                                data: result2
                            })
                        })
                })
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
    addOne: (req, res) => {
        try {
            Tasks
                .create({
                    userId: req.user.id,
                    task: req.body.task,
                    status: 'uncompleted',
                    createdAt: null,
                    updatedAt: null
                })
                .then(result => {
                    Tasks
                        .findAll({
                            where: {
                                userId: req.user.id
                            }
                        })
                        .then(result2 => {
                            res.send({
                                message: 'Data is successfully added.',
                                data: result2
                            })
                        })
                })
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
    updateOne: (req, res) => {
        try {
            Tasks
                .update(
                    {
                        task: req.body.task
                    },
                    {
                        where: {
                            id: parseInt(req.params.id),
                            userId: req.user.id
                        }
                    }
                )
                .then(result => {
                    Tasks
                        .findAll({
                            where: {
                                userId: req.user.id
                            }
                        })
                        .then(result2 => {
                            res.send({
                                message: 'Data is successfully updated.',
                                data: result2
                            })
                        })
                })
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
    setAsCompleted: (req, res) => {
        try {
            Tasks
                .update(
                    {
                        status: 'completed'
                    },
                    {
                        where: {
                            id: parseInt(req.params.id),
                            userId: req.user.id
                        }
                    }
                )
                .then(result => {
                    Tasks
                        .findAll({
                            where: {
                                userId: req.user.id
                            }
                        })
                        .then(result2 => {
                            res.send({
                                message: 'Data is successfully updated.',
                                data: result2
                            })
                        })
                })
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