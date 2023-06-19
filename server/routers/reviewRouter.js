const reviewController = require('../controllers/reviewController')
const Router = require('express')
const router = new Router;
const authenticateToken = require('../middlewares/authenticateToken')

router.post('/',reviewController.create)
router.put('/:id', authenticateToken,reviewController.update)
router.delete('/:id', authenticateToken, reviewController.delete)
router.get('/', reviewController.getAll)
router.get('/:id', reviewController.getOne)

module.exports = router