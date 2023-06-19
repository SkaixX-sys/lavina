const roomController = require('../controllers/roomController')
const Router = require('express')
const router = new Router;
const authenticateToken = require('../middlewares/authenticateToken')
const { uploadImage } = require('../middlewares/upload')

router.post('/:type', authenticateToken, uploadImage,roomController.create)
router.put('/:id', authenticateToken, uploadImage,roomController.update)
router.delete('/:id', authenticateToken, roomController.delete)
router.get('/getRooms/:type', roomController.getAll)
router.get('/getRoom/:id', roomController.getOne)

module.exports = router