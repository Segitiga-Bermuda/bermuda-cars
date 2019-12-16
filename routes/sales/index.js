const router = require('express').Router(),
    invController = require('./controller')

router.get('/', invController.getGross)


module.exports = router