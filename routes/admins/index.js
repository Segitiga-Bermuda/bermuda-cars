const router = require('express').Router(),
    adminsRouter = require('./controller')

router.post('/add-new-account', adminsRouter.register)
router.post('/log-in', adminsRouter.logIn)
router.put('/update/email', adminsRouter.updateEmail)
router.put('/update/password', adminsRouter.updatePassword)
router.put('/avatar', adminsRouter.updateAvatar)



module.exports = router
