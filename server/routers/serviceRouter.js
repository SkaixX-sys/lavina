const Router = require('express')
const router = new Router;
const controller = require('../controllers/serviceController')
const authenticateToken = require('../middlewares/authenticateToken')
const {uploadImage} = require('../middlewares/upload')

router.post('/',  authenticateToken, uploadImage, controller.create)
router.put('/:id', authenticateToken, uploadImage, controller.update)
router.delete('/:id', authenticateToken, controller.delete)
router.get('/', controller.getAll)
router.get('/:type', controller.getOne)

module.exports = router