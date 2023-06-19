const ApiError = require("../Error/ApiError");
const Images = require("../models/images");
const path = require("path");
const { uploadImage } = require("../middlewares/upload");

class imagesController {
  async create(req, res, next) {
    try {
      let { albumId } = req.body;
      if (req.user.role !== "admin") {
        return next(ApiError.forbidden("Доступ закрыт"));
      }
      const image = req.file ? path.basename(req.file.path) : null;
      if (!albumId || !image) {
        return next(ApiError.badRequest("Укажите все данные"));
      }
      const images = await Images.create({ image, albumId });
      return res.json(images);
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { albumId } = req.body;
      if (req.user.role !== "admin") {
        return next(ApiError.forbidden("Доступ закрыт"));
      }
      const image = req.file ? path.basename(req.file.path) : null;
      const сheck = await Images.findOne({ where: { id } });
      if (!сheck) {
        return next(ApiError.notFound("Запись не найдена"));
      }
      const updated = {
        albumId: albumId || Images.albumId,
        image: image || Images.image,
      };
      await Images.update(updated, { where: { id } });
      return res.json(updated);
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      if (req.user.role !== "admin") {
        return next(ApiError.forbidden("Доступ закрыт"));
      }
      const check = await Images.findByPk(id);
      if (!check) {
        return next(ApiError.notFound("Запись не найдена"));
      }
      await Images.destroy({ where: { id } });

      const image = check.image;

      if (image) {
        try {
          const imagePath = path.join(__dirname, "..", "static", image);
          fs.unlinkSync(imagePath);
        } catch (e) {
        }
      }
      return res.json({ message: "Detele was succes" });
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }

  async getAll(req, res, next) {
    try {
      let { id } = req.params;
      const images = await Images.findAll({ where: { albumId: id } });
      if (!images) {
        return next(ApiError.notFound("Изображение не найдена"));
      }
      return res.json(images);
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }
  async getOne(req, res, next) {
    try {
      let { id } = req.params;
      const images = await Images.findOne({ where: { id } });
      if (!images) {
        return next(ApiError.notFound("Изображение не найдена"));
      }
      return res.json(images);
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }
}

module.exports = new imagesController();
