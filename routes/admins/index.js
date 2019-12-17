const router = require('express').Router(),
    adminsRouter = require('./controller')

router.post('/add-new-account', adminsRouter.register)
router.post('/log-in', adminsRouter.logIn)
router.put('/update', adminsRouter.updateOne)
router.put('/avatar', adminsRouter.updateAvatar)



module.exports = router
