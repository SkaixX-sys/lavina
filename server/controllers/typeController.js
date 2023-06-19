const ApiError = require('../Error/ApiError')
const Model = require('../models/dataTypes')

class typeController {
    async create(req, res, next) {
        try {
            let { item, relateTo } = req.body
            if (req.user.role !== 'admin') {
                return next(ApiError.forbidden("Доступ закрыт"))
            }
            if (!item || !relateTo) {
                return next(ApiError.badRequest("Укажите все данные"))
            }
            const Item = await Model.create({ item, relateTo })
            return res.json(Item)
        } catch (e) {
            // return res.send(e)
            return next(ApiError.internal("Ошибка сервера"))
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const { item, relateTo } = req.body
            if (req.user.role !== 'admin') {
                return next(ApiError.forbidden("Доступ закрыт"))
            }
            const Item = await Model.findOne({ where: { id } });
            if (!Item) {
                return next(ApiError.notFound("Запись не найдена"))
            }
            const updated = {
                item: item || Model.item,
                relateTo: relateTo || Model.relateTo
            };
            await Model.update(
                updated,
                { where: { id } }
            )
            return res.json(updated)
        } catch (e) {
            return next(ApiError.internal("Ошибка сервера"))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            if (req.user.role !== 'admin') {
                return next(ApiError.forbidden('Доступ закрыт'))
            }
            const check = await Model.findByPk(id)
            if (!check) {
                return next(ApiError.notFound("Запись не найдена"))
            }
            await Model.destroy({ where: { id } })
            return res.json({ message: 'Detele was succes' })
        } catch (e) {
            return next(ApiError.internal("Ошибка сервера"))
        }
    }

    async getAll(req, res, next) {
        try {
            const {relateTo} = req.params
            if(!relateTo) {
                return next(ApiError.notFound("Укажите связь"))
            }
            const Item = await Model.findAll({where:{relateTo}});
            if (!Item) {
                return next(ApiError.notFound("Типы не найдены"))
            }
            return res.json(Item);
        } catch (e) {
            return res.send(e)
            return next(ApiError.internal("Ошибка сервера"))
        }
    }
    async getOne(req, res, next) {
        try {
            const {relateTo} = req.params
            if(!relateTo) {
                return next(ApiError.notFound("Укажите связь"))
            }
            const Item = await Model.findOne({where:{relateTo}});
            if (!Item) {
                return next(ApiError.notFound("Тип не найдены"))
            }
            return res.json(Item);
        } catch (e) {
            return next(ApiError.internal("Ошибка сервера"))
        }
    }
    
}

module.exports = new typeController()
