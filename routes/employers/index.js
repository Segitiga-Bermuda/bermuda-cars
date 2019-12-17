const router = require('express').Router(),
    employersRouter = require('./controller')

router.post('/log-in', employersRouter.logIn)
router.put('/update', employerRouter.updateOne)
router.put('/avatar', employersRouter.updateAvatar)

module.exports = router