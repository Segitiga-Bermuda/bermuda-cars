const router = require('express').Router(),
    tasksController = require('./controller')

router.get('/', tasksController.getById)
router.delete('/:id', tasksController.deleteOne)
router.put('/:id', tasksController.updateOne)
router.post('/add', tasksController.addOne)
router.put('/completed/:id', tasksController.setAsCompleted)

module.exports = router