const model = require("../models/infos");
const ApiError = require("../Error/ApiError");
const path = require("path");
const { uploadImage } = require("../middlewares/upload");

class infosController {
  async create(req, res, next) {
    try {
      let { type, title, description } = req.body;
      if (req.user.role !== "admin") {
        return next(ApiError.forbidden("Доступ закрыт"));
      }
      const image = req.file ? path.basename(req.file.path) : null;
      if (!type || !title || !description || !image) {
        return next(ApiError.badRequest("Укажите все данные"));
      }
      const checkUnique = await model.findOne({ where: { type } });
      if (checkUnique) {
        return next(ApiError.badRequest("Этот тип уже создан"));
      }
      const Model = await model.create({ type, title, description, image });
      return res.json(Model);
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { type, title, description } = req.body;
      if (req.user.role !== "admin") {
        return next(ApiError.forbidden("Доступ закрыт"));
      }
      const image = req.file ? path.basename(req.file.path) : null;
      const TypeService = await model.findOne({ where: { id } });
      if (!TypeService) {
        return next(ApiError.notFound("Запись не найдена"));
      }
      const checkUnique = type
        ? await model.findOne({ where: { type } })
        : null;
      if (checkUnique) {
        return next(ApiError.badRequest("Этот тип уже есть"));
      }
      const updatedModel = {
        type: type || model.type,
        title: title || model.title,
        description: description || model.description,
        image: image || model.image,
      };

      await model.update(updatedModel, { where: { id } });
      return res.json(updatedModel);
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
      await model.destroy({ where: { id } });
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
      const Model = await model.findAll();
      return res.json(Model);
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }
}

module.exports = new infosController();
