const router = require('express').Router(),
    attController = require('./controller')

router.post('/add', attController.addReport)
router.get('/:year/:month', attController.getAll)
router.put('/:year/:month/:id', attController.updateOne)
router.delete('/:year/:month/:id', attController.deleteOne)



module.exports = router