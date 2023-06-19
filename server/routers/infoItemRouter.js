const Router = require('express')
const router = new Router;
const controller = require('../controllers/infoItemController')
const authenticateToken = require('../middlewares/authenticateToken')

router.post('/', authenticateToken, controller.create)
router.put('/:id', authenticateToken, controller.update)
router.delete('/:id', authenticateToken, controller.delete)
router.get('/:type', controller.getAll)

module.exports = router