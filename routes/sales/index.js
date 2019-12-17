const router = require('express').Router(),
    salesController = require('./controller')

router.get('/', salesController.getGross)
router.post('/add/:itemId', salesController.addOne)
router.delete('/delete/:id', salesController.deleteOne)
router.put('/:id', salesController.updateOne)
router.get('/revenue/:year', salesController.getRevenueReports)
router.get('/sale/:year/:month', salesController.getSaleReports)
router.get('/years', salesController.getYears)
router.get('/years/:year', salesController.getMonths)


module.exports = router