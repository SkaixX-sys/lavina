const Router = require('express')
const router = new Router;
const controller = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/registration', controller.register)
router.post('/login/', controller.login)
router.delete('/:id', controller.deleteAccount)
router.get('/auth', authMiddleware, controller.check)

module.exports = router