const router = require('express').Router(),
    attController = require('./controller')

router.post('/add', attController.addReport)


module.exports = router