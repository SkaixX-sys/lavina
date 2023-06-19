const Album = require('../models/album')
const ApiError = require('../Error/ApiError');
const path = require('path');
const { uploadImage } = require('../middlewares/upload');

class albumController {
    async create(req, res,next) {
        try {
            let { author, title, countImages, infoId } = req.body
            if (req.user.role !== 'admin') {
                return next(ApiError.forbidden('Доступ закрыт'));
            }
            if (!author || !title || !countImages) {
                return next(ApiError.badRequest("Укажите все данные"))
            }
            const album = await Album.create({ author, title, countImages, infoId })
            return res.json(album)
        } catch (e) {
            return next(ApiError.internal("Ошибка сервера"))
        }
    }

    async update(req, res,next) {
        try {
            const { id } = req.params
            const { author, title, countImages, infoId } = req.body
            if (req.user.role !== 'admin') {
                return next(ApiError.forbidden('Доступ закрыт'));
            }
            const check = await Album.findOne({ where: { id } });
            if (!check) {
                return next(ApiError.notFound("Запись не найдена"))
            }
            const updated = {
                author: author || Album.author,
                title: title || Album.title,
                countImages: countImages || Album.countImages,
                infoId: infoId || Album.infoId
            };
            await Album.update(
                updated,
                { where: { id } }
            )
            return res.json(updated)
        } catch (e) {
            return next(ApiError.internal("Ошибка сервера"))
        }
    }

    async delete(req, res,next) {
        try {
            const { id } = req.params
            if (req.user.role !== 'admin') {
                return next(ApiError.forbidden('Доступ закрыт'))
            }
            const check = await Album.findByPk(id)
            if (!check) {
                return next(ApiError.notFound("Запись не найдена"))
            }
            await Album.destroy({ where: { id } })

            const image = check.image;
      
            if (image) {
              try {
                const imagePath = path.join(__dirname, "..", "static", image);
                fs.unlinkSync(imagePath);
              } catch (e) {
              }
            }
            return res.json({ message: 'Detele was succes' })
        } catch (e) {
            return next(ApiError.internal("Ошибка сервера"))
        }
    }

    async getAll(req, res,next) {
        try {
            const album = await Album.findAll();
            if (!album) {
                return next(ApiError.notFound("Альбомы не найдены"))
            }
            return res.json(album);
        } catch (e) {
            return next(ApiError.internal("Ошибка сервера"))
        }
    }
}

module.exports = new albumController()
