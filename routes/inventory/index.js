const router = require('express').Router(),
    invController = require('./controllerr')

router.get('/', invController.getById)
router.post('/add', tasksController.addOne)
router.delete('/:id', invController.deleteOne)
router.put('/:id', invController.updateOne)

module.exports = router