const router = require('express').Router(),
    adminsRouter = require('./controller')

router.post('/add-new-account', adminsRouter.register)
router.post('/log-in', adminsRouter.logIn)


module.exports = router
