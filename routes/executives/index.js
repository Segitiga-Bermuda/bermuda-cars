const router = require('express').Router(),
    executivesRouter = require('./controller')

router.post('/log-in', executivesRouter.logIn)
router.put('/update', executivesRouter.updateOne)


module.exports = router