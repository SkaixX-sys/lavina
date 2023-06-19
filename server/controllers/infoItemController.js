const model = require("../models/infoItems");
const ApiError = require("../Error/ApiError");
const path = require("path");

class infoItemController {
  async create(req, res, next) {
    try {
      let { infoId, description, type } = req.body;
      if (req.user.role !== "admin") {
        return next(ApiError.forbidden("Доступ закрыт"));
      }
      if (!description) {
        return next(ApiError.badRequest("Укажите данные"));
      }
      const Model = await model.create({ infoId, description, type });
      return res.json(Model);
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      let { infoId, description, type } = req.body;
      if (req.user.role !== "admin") {
        return next(ApiError.forbidden("Доступ закрыт"));
      }
      const Model = await model.findOne({ where: { id } });
      if (!Model) {
        return next(ApiError.badRequest("Запись не найдена"));
      }
      if (!description) {
        return next(ApiError.badRequest("Укажите данные"));
      }
      const updatedModel = {
        description: description || Model.description,
        infoId: infoId || Model.infoId,
        type: type || Model.type,
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
      return res.json({ message: "Detele was succes" });
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }

  async getAll(req, res, next) {
    try {
      const { type } = req.query;
      const Model = await model.findAll({ where: { type } });
      if (!Model) {
        return next(ApiError.notFound("Записи не найдены"));
      }
      return res.json(Model);
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }
}

module.exports = new infoItemController();
