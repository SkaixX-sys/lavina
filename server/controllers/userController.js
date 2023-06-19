const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Model = require('../models/users');
const ApiError = require('../Error/ApiError')

class userController {
    async register(req, res, next) {
        const { login, password } = req.body;

        if (!password && !login) {
            return next(ApiError.badRequest('Введите данные'))
        }
        const model = await Model.findOne({ where: { login } });
        if (model) {
            return next(ApiError.badRequest("Логин занят"))
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const admin = await Model.create({
                login,
                password: hashedPassword,
                role: 'admin',
            });
            const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET);
            res.json({ token });
        } catch (e) {
            return next(ApiError.internal("Ошибка сервера"))
        }
    }

    async login(req, res, next) {
        try {
            const { login, password } = req.body;
            if (!password && !login) {
                return next(ApiError.badRequest('Введите данные'))
            }
            const user = await Model.findOne({ where: { login } });
            if(!user){
                return next(ApiError.badRequest("Неверный логин"))

            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return next(ApiError.forbidden("Неверный пароль"))
            }
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
            res.json({ token });
        } catch (e) {
            return next(ApiError.internal("Ошибка сервера"))
        }
    }

    async deleteAccount(req, res, next) {
        try {
            const { id } = req.params;
            const { password, retryPassword } = req.body
            const model = await Model.findByPk(id);
            if (!model) {
                return next(ApiError.notFound("Неверный логин"))
            }
            if (!retryPassword && !password) {
                return next(ApiError.forbidden('Укажите пароль'))
            }
            if (retryPassword !== password) {
                return next(ApiError.forbidden('Пароли не совпадают'))
            }
            if (password !== process.env.SECRET_PASSWORD || retryPassword !== process.env.SECRET_PASSWORD) {
                return next(ApiError.forbidden('Неверно указан пароль'))
            }
            await model.destroy({ where: { id } });
            res.json({ message: 'Admin account deleted successfully' });
        } catch (e) {
            return next(ApiError.internal("Ошибка сервера"))
        }
    }
    async check(req, res, next) {

        const token = jwt.sign({ id: req.user.id, role: req.user.role, login: req.user.login }, process.env.JWT_SECRET)
        return res.json({ token })

    }
}

module.exports = new userController();