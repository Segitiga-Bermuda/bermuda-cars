const router = require('express').Router(),
    usersController = require('./controller')

router.post('/log-in', usersController.logIn)
router.post('/register', usersController.register)

module.exports = router