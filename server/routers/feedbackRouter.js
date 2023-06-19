const feedbackController = require('../controllers/feedbackController')
const Router = require('express')
const router = new Router;
const authenticateToken = require('../middlewares/authenticateToken')

router.post('/',  feedbackController.create)
router.put('/:id', authenticateToken,  feedbackController.update)
router.delete('/:id', authenticateToken, feedbackController.delete)
router.get('/',authenticateToken, feedbackController.getAll)

module.exports = router