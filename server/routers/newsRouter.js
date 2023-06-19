const newsController = require('../controllers/newsController')
const Router = require('express')
const router = new Router;
const authenticateToken = require('../middlewares/authenticateToken')
const { uploadImage } = require('../middlewares/upload')

router.post('/', authenticateToken, uploadImage, newsController.create)
router.put('/:id', authenticateToken, uploadImage, newsController.update)
router.delete('/:id', authenticateToken, newsController.delete)
router.get('/', newsController.getAll)
router.get('/:id', newsController.getOne)

module.exports = router