const albumController = require('../controllers/albumController')
const Router = require('express')
const router = new Router;
const authenticateToken = require('../middlewares/authenticateToken')
const { uploadImage } = require('../middlewares/upload')

router.post('/', authenticateToken, uploadImage, albumController.create)
router.put('/:id', authenticateToken, uploadImage, albumController.update)
router.delete('/:id', authenticateToken, albumController.delete)
router.get('/', albumController.getAll)

module.exports = router