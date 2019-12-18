const router = require('express').Router(),
    executivesRouter = require('./controller')

router.post('/log-in', executivesRouter.logIn)
router.put('/update/email', executivesRouter.updateEmail)
router.put('/update/password', executivesRouter.updatePassword)
router.put('/avatar', executivesRouter.updateAvatar)
router.get('/view-profile', executivesRouter.viewProfile)

module.exports = router