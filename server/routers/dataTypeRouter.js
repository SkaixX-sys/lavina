const controller = require('../controllers/typeController')
const Router = require('express')
const router = new Router;
const authenticateToken = require('../middlewares/authenticateToken')

router.post('/', authenticateToken, controller.create)
router.put('/:id', authenticateToken, controller.update)
router.delete('/:id', authenticateToken, controller.delete)
router.get('/:relateTo', authenticateToken, controller.getAll)
router.get('/:relateTo', authenticateToken, controller.getOne)

module.exports = router