const model = require("../models/service");
const ApiError = require("../Error/ApiError");
const path = require("path");
const { uploadImage } = require("../middlewares/upload");

class serviceController {
  async create(req, res, next) {
    try {
      let { type, title, description, dataTypeId } = req.body;
      if (req.user.role !== "admin") {
        return next(ApiError.forbidden("Доступ закрыт"));
      }
      const image = req.file ? path.basename(req.file.path) : null;
      if (!type || !title || !description || !image || !dataTypeId) {
        return next(ApiError.badRequest("Укажите все данные"));
      }
      const checkUnique = await model.findOne({ where: { type } });
      if (checkUnique) {
        return next(ApiError.badRequest("Этот тип уже создан"));
      }
      const Model = await model.create({
        type,
        title,
        description,
        image,
        dataTypeId,
      });
      return res.json(Model);
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { type, title, description, dataTypeId } = req.body;
      if (req.user.role !== "admin") {
        return next(ApiError.forbidden("Доступ закрыт"));
      }
      const image = req.file ? path.basename(req.file.path) : null;
      const Model = await model.findOne({ where: { id } });
      if (!Model) {
        return next(ApiError.notFound("Запись не найдена"));
      }
      const checkUnique = type
        ? await model.findOne({ where: { type } })
        : null;
      if (checkUnique) {
        return next(ApiError.badRequest("Этот тип уже есть"));
      }
      const updatedModel = {
        type: type || Model.type,
        title: title || Model.title,
        description: description || Model.description,
        image: image || Model.image,
        dataTypeId: dataTypeId || Model.dataTypeId,
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
      const check = await model.findByPk(id);
      if (!check) {
        return next(ApiError.notFound("Запись не найдена"));
      }
      const Model = await model.destroy({ where: { id } });
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
      const limit = +req.query.limit || 10;
      const page = +req.query.page || 1;
      const offset = (page - 1) * limit;
      const Model = await model.findAll({
        limit,
        offset,
      });
      const count = await model.count();
      const pages = Math.ceil(count / limit);
      return res.json({ Model, count, pages });
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }
  async getOne(req, res, next) {
    try {
      const { type } = req.params;
      const Model = await model.findOne({ where: { type } });
      if (!Model) {
        return next(ApiError.notFound("Запись не найдена"));
      }
      return res.json(Model);
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }
}

module.exports = new serviceController();
