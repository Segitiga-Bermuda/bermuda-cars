const router = require('express').Router(),
    employersRouter = require('./controller')

router.post('/log-in', employersRouter.logIn)
router.put('/update/email', employersRouter.updateEmail)
router.put('/update/password', employersRouter.updatePassword)
router.put('/avatar', employersRouter.updateAvatar)
router.get('/view-profile', employersRouter.viewProfile)

module.exports = router