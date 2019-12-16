const router = require('express').Router(),
    attController = require('./controller')

router.post('/add', attController.addReport)
router.get('/', attController.getAll)



module.exports = router