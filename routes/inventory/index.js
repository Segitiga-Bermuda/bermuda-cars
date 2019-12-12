const router = require('express').Router(),
    invController = require('./controller')

router.get('/', invController.getById)
router.post('/add', invController.addOne)
router.delete('/:id', invController.deleteOne)
router.put('/:id', invController.updateOne)

module.exports = router