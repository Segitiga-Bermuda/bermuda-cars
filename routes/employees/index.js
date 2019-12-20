const router = require('express').Router(),
    employeesRouter = require('./controller')

router.post('/log-in', employeesRouter.logIn)
router.put('/update/email', employeesRouter.updateEmail)
router.put('/update/password', employeesRouter.updatePassword)
router.put('/avatar', employeesRouter.updateAvatar)
router.get('/view-profile', employeesRouter.viewProfile)

module.exports = router