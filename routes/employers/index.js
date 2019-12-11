const router = require('express').Router(),
    employersRouter = require('./controller')

router.post('/log-in', employersRouter.logIn)

module.exports = router