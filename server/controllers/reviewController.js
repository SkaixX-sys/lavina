const Review = require("../models/review");
const ApiError = require("../Error/ApiError");
const path = require("path");

class reviewController {
  async create(req, res, next) {
    try {
      let { text, name, surname, patronymic, rating, status } = req.body;
      if (!text || !name || !surname || !patronymic || !rating) {
        return next(ApiError.badRequest("Укажите все данные"));
      }
      const review = await Review.create({
        text,
        name,
        surname,
        patronymic,
        rating,
        status:"false",
      });
      return res.json(review);
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { text, name, surname, patronymic, rating, status } = req.body;
      if (req.user.role !== "admin") {
        return next(ApiError.forbidden("Доступ закрыт"));
      }
      const review = await Review.findOne({ where: { id } });
      if (!review) {
        return next(ApiError.notFound("Запись не найдена"));
      }
      const updated = {
        text: text || Review.text,
        name: name || Review.name,
        surname: surname || Review.surname,
        patronymic: patronymic || Review.patronymic,
        rating: rating || Review.rating,
        status: status || Review.status,
      };
      await Review.update(updated, { where: { id } });
      return res.json(review);
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
      const check = await Review.findByPk(id);
      if (!check) {
        return next(ApiError.notFound("Запись не найдена"));
      }
      await Review.destroy({ where: { id } });
      return res.json({ message: "Detele was succes" });
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }

  async getAll(req, res, next) {
    try {
      const {status} = req.body
      const review = await Review.findAll();
      if (!review) {
        return next(ApiError.notFound("Запись не найдена"));
      }
      return res.json(review);
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }
  async getOne(req, res, next) {
    try {
      let { id } = req.params;
      const review = await Review.findOne({ where: { id } });
      if (!review) {
        return next(ApiError.notFound("Запись не найдена"));
      }
      return res.json(review);
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }
}

module.exports = new reviewController();
