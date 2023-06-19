const hotelsController = require('../controllers/hotelsController')
const Router = require('express')
const router = new Router;
const authenticateToken = require('../middlewares/authenticateToken')
const { uploadImage } = require('../middlewares/upload')

router.post('/', authenticateToken, uploadImage, hotelsController.create)
router.put('/:id', authenticateToken, uploadImage, hotelsController.update)
router.delete('/:id', authenticateToken, hotelsController.delete)
router.get('/', hotelsController.getAll)
router.get('/:type', hotelsController.getOne)

module.exports = router