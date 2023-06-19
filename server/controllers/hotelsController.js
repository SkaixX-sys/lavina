const model = require('../models/hotels')
const ApiError = require('../Error/ApiError');
const path = require('path');
const { uploadImage } = require('../middlewares/upload');

class hotelsController {
    async create(req, res, next) {
        try {
            let { type, title, description, isFullBusy } = req.body
            if (req.user.role !== 'admin') {
                return next(ApiError.forbidden('Доступ закрыт'));
            }
            const image = req.file ? path.basename(req.file.path) : null;
            if (!type || !title || !description || !image || !isFullBusy) {
                return next(ApiError.badRequest("Укажите все данные"))
            }
            const checkUnique = await model.findOne({ where: { type } });
            if (checkUnique) {
                return next(ApiError.badRequest("Этот тип уже создан"))
            }
            const Hotel = await model.create({ type, title, description, isFullBusy, image })
            return res.json(Hotel)
        } catch (e) {
            return next(ApiError.internal("Ошибка сервера"))
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const { type, title, description, isFullBusy } = req.body
            if (req.user.role !== 'admin') {
                return next(ApiError.forbidden('Доступ закрыт'))
            }
            const image = req.file ? path.basename(req.file.path) : null;
            const Model = await model.findOne({ where: { id } });
            if (!Model) {
                return next(ApiError.notFound("Запись не найдена"))
            }
            const checkUnique = type ? await model.findOne({ where: { type } }) : null;
            if (checkUnique) {
                return next(ApiError.badRequest("Этот тип уже есть"))
            }
            const updatedModel = {
                type: type || Model.type,
                title: title || Model.title,
                description: description || Model.description,
                image: image || Model.image,
                isFullBusy: isFullBusy || Model.isFullBusy
            };
            await model.update(
                updatedModel,
                { where: { id } }
            )
            return res.json(updatedModel)
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
            
            const image = check.image;
      
            if (image) {
              try {
                const imagePath = path.join(__dirname, "..", "static", image);
                fs.unlinkSync(imagePath);
              } catch (e) {
              }
            }
            const hotel = await model.destroy({ where: { id } })
            return res.json({ message: 'Detele was succes' })
        } catch (e) {
            return next(ApiError.internal("Ошибка сервера"))
        }
    }

    async getAll(req, res, next) {
        try {
            const hotels = await model.findAll();
            return res.json(hotels);
        } catch (e) {
            return next(ApiError.internal("Ошибка сервера"))
        }
    }

    async getOne(req, res, next) {
        try {
            const { type } = req.params
            const hotel = await model.findOne({ where: { type } })
            if (!hotel) {
                return next(ApiError.notFound("Запись не найдена"))
            }
            return res.json(hotel)
        } catch (e) {
            return next(ApiError.internal("Ошибка сервера"))
        }
    }
}

module.exports = new hotelsController()
