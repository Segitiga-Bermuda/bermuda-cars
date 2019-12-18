const router = require('express').Router(),
    usersController = require('./controller')

router.post('/log-in', usersController.logIn)
router.post('/register', usersController.register)
router.put('/update', usersController.updateOne)
router.put('/avatar', usersController.updateAvatar)

module.exports = router