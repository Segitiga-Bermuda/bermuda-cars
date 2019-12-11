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
            const user = jwt.verify(req.get('X-API-KEY'), JWT_SECRET_KEY)

            Tasks
                .findAll({
                    where: {
                        userId: user.id
                    }
                })
                .then(result => {
                    res.send({
                        message: 'Get data by id.',
                        data: result
                    })
                })
        } catch (error) {
            console.log(error)
        }
    },
    getCompleted: (req, res) => {
        const user = jwt.verify(req.get('X-API-KEY'), JWT_SECRET_KEY)

        try {
            Tasks
                .findAll({
                    where: {
                        userId: user.id,
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
            console.log(error)
        }
    },
    getUncompleted: (req, res) => {
        const user = jwt.verify(req.get('X-API-KEY'), JWT_SECRET_KEY)

        try {
            Tasks
                .findAll({
                    where: {
                        userId: user.id,
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
            console.log(error)
        }
    },
    deleteOne: (req, res) => {
        const user = jwt.verify(req.get('X-API-KEY'), JWT_SECRET_KEY)

        try {
            Tasks
                .update(
                    {
                        status: 'deleted'
                    },
                    {
                        where: {
                            id: parseInt(req.params.id),
                            userId: user.id
                        }
                    }
                )
                .then(result => {
                    Tasks
                        .findAll({
                            where: {
                                userId: user.id
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
            console.log(error)
        }
    },
    addOne: (req, res) => {
        const user = jwt.verify(req.get('X-API-KEY'), JWT_SECRET_KEY)

        try {
            Tasks
                .create({
                    userId: user.id,
                    task: req.body.task,
                    status: 'uncompleted',
                    createdAt: null,
                    updatedAt: null
                })
                .then(result => {
                    Tasks
                        .findAll({
                            where: {
                                userId: user.id
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
            console.log(error)
        }
    },
    updateOne: (req, res) => {
        const user = jwt.verify(req.get('X-API-KEY'), JWT_SECRET_KEY)

        try {
            Tasks
                .update(
                    {
                        task: req.body.task
                    },
                    {
                        where: {
                            id: parseInt(req.params.id),
                            userId: user.id
                        }
                    }
                )
                .then(result => {
                    Tasks
                        .findAll({
                            where: {
                                userId: user.id
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
            console.log(error)
        }
    },
    setAsCompleted: (req, res) => {
        const user = jwt.verify(req.get('X-API-KEY'), JWT_SECRET_KEY)

        try {
            Tasks
                .update(
                    {
                        status: 'completed'
                    },
                    {
                        where: {
                            id: parseInt(req.params.id),
                            userId: user.id
                        }
                    }
                )
                .then(result => {
                    Tasks
                        .findAll({
                            where: {
                                userId: user.id
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
            console.log(error)
        }
    }
}