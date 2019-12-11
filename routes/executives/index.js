const router = require('express').Router(),
    executivesRouter = require('./controller')

router.post('/log-in', executivesRouter.logIn)

module.exports = router