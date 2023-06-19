const model = require('../models/servicePriceList')
const ApiError = require('../Error/ApiError');
const path = require('path');
const { uploadImage } = require('../middlewares/upload');

class servicePriceList {
    async create(req, res, next) {
        try {
            const { weekendNewPrice, weekendOldPrice, weekdayNewPrice, weekdayOldPrice, period, description, quantity, serviceId, type } = req.body
            if (req.user.role !== 'admin') {
                return next(ApiError.forbidden('Доступ закрыт'));
            }
            if (!weekendNewPrice || !weekdayNewPrice || !period) {
                return next(ApiError.badRequest("Укажите все данные"))
            }
            const Model = await model.create({ weekendNewPrice, weekendOldPrice, weekdayNewPrice, weekdayOldPrice, period, description, quantity, serviceId, type })
            return res.json(Model)
        } catch (e) {
            return next(ApiError.internal("Ошибка сервера"))
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const { weekendNewPrice, weekendOldPrice, weekdayNewPrice, weekdayOldPrice, period, description, quantity, serviceId, type } = req.body
            if (req.user.role !== 'admin') {
                return next(ApiError.forbidden('Доступ закрыт'));
            }
            const Model = await model.findOne({ where: { id } });
            if (!Model) {
                return next(ApiError.notFound("Запись не найдена"))
            }
            const updated = {
                weekendNewPrice: weekendNewPrice || Model.weekendNewPrice,
                weekendOldPrice: weekendOldPrice || Model.weekendOldPrice,
                weekdayNewPrice: weekdayNewPrice || Model.weekdayNewPrice,
                weekdayOldPrice: weekdayOldPrice || Model.weekdayOldPrice,
                period: period || Model.period,
                description: description || Model.description,
                serviceId: serviceId || Model.serviceId,
                quantity: quantity || Model.quantity,
                type: type || Model.type,
            };
            await model.update(
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
            const check = await model.findByPk(id)
            if (!check) {
                return next(ApiError.notFound("Запись не найдена"))
            }
            await model.destroy({ where: { id } })
            return res.json({ message: 'Detele was succes' })
        } catch (e) {
            return next(ApiError.internal("Ошибка сервера"))
        }
    }

    async getAll(req, res, next) {
        try {
            let { type } = req.params
            const Model = await model.findAll({ where: { type:type } });
            if (!Model) {
                return next(ApiError.notFound("Услуга не найдена"))
            }
            return res.json(Model);
        } catch (e) {
            return next(ApiError.internal("Ошибка сервера"))
        }
    }
}

module.exports = new servicePriceList()
