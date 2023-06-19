const Feedback = require("../models/feedback");
const ApiError = require("../Error/ApiError");

class feedbackController {
  async create(req, res, next) {
    try {
      let { name, phone, type } = req.body;
      const check = await Feedback.findOne({ where: { name } });
      if (check) {
        return next(ApiError.notFound("Данные на это имя уже добавлены"));
      }
      const feedback = await Feedback.create({ name, phone, type });
      if (!name || !phone || !type) {
        return next(ApiError.badRequest("Укажите все данные"));
      }
      return res.json(feedback);
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, phone, type } = req.body;
      if (req.user.role !== "admin") {
        return next(ApiError.forbidden("Доступ закрыт"));
      }
      const feedback = await Feedback.findOne({ where: { id } });
      if (!feedback) {
        return next(ApiError.notFound("Запись не найдена"));
      }
      const updated = {
        name: name || Feedback.name,
        phone: phone || Feedback.phone,
        type: type || Feedback.type,
      };
      await Feedback.update(updated, { where: { id } });
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
      const check = await Feedback.findByPk(id);
      if (!check) {
        return next(ApiError.notFound("Запись не найдена"));
      }
      await Feedback.destroy({ where: { id } });
      return res.json({ message: "Detele was succes" });
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }

  async getAll(req, res, next) {
    try {
      if (req.user.role !== "admin") {
        return next(ApiError.forbidden("Доступ закрыт"));
      }
      const feedback = await Feedback.findAll();
      if (!feedback) {
        return next(ApiError.notFound("Записи не найдены"));
      }
      return res.json(feedback);
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }
}

module.exports = new feedbackController();
