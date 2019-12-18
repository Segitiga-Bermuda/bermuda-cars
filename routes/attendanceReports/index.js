const router = require('express').Router(),
    attController = require('./controller')

router.post('/add', attController.addReport)
router.get('/', attController.getAll)
router.put('/:id', attController.updateOne)
router.delete('/delete/:id', attController.deleteOne)



module.exports = router