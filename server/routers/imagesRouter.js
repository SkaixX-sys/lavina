const imagesController = require('../controllers/imagesController')
const Router = require('express')
const router = new Router;
const authenticateToken = require('../middlewares/authenticateToken')
const { uploadImage } = require('../middlewares/upload')

router.post('/', authenticateToken, uploadImage, imagesController.create)
router.put('/:id', authenticateToken, uploadImage, imagesController.update)
router.delete('/:id', authenticateToken, imagesController.delete)
router.get('/:id', imagesController.getAll)
router.get('/:id', imagesController.getOne)

module.exports = router