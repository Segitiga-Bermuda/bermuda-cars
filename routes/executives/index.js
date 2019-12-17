const router = require('express').Router(),
    executivesRouter = require('./controller')

router.post('/log-in', executivesRouter.logIn)
router.put('/update', executivesRouter.updateOne)
router.put('/avatar', executivesRouter.updateAvatar)


module.exports = router