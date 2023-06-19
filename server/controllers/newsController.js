const News = require("../models/news");
const ApiError = require("../Error/ApiError");
const path = require("path");

class newsController {
  async create(req, res, next) {
    try {
      let { type, title, description, infoId, text } = req.body;
      if (req.user.role !== "admin") {
        return next(ApiError.forbidden("Доступ закрыт"));
      }
      const image = req.file ? path.basename(req.file.path) : null;
      if (!image) {
        return next(ApiError.badRequest("Укажите изображение"));
      }
      if (!type || !title || !description || !image) {
        return next(ApiError.badRequest("Укажите все данные"));
      }
      const news = await News.create({
        type,
        title,
        description,
        image,
        infoId,
        text,
      });
      if (!news) {
        return next(ApiError.internal("Новость не создана"));
      }
      return res.json(news);
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { type, title, description, infoId, text } = req.body;
      if (req.user.role !== "admin") {
        return next(ApiError.forbidden("Доступ закрыт"));
      }
      const image = req.file ? path.basename(req.file.path) : null;
      const news = await News.findOne({ where: { id } });
      if (!news) {
        return next(ApiError.notFound("Запись не найдена"));
      }
      const updated = {
        type: type || News.type,
        title: title || News.title,
        description: description || News.description,
        infoId: infoId || News.infoId,
        image: image || News.image,
        text: text || News.text,
      };
      await News.update(updated, { where: { id } });
      return res.json(news);
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
      const check = await News.findByPk(id);
      if (!check) {
        return next(ApiError.notFound("Запись не найдена"));
      }
      const news = await News.destroy({ where: { id } });
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
      const news = await News.findAll({
        order: [["id", "DESC"]],
        limit,
        offset,
      });
      if (!news) {
        return next(ApiError.notFound("Новость не найдена"));
      }
      const count = await News.count();
      const pages = Math.ceil(count / limit);
      return res.json({ news, count, pages });
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }
  async getOne(req, res, next) {
    try {
      let { id } = req.params;
      const news = await News.findOne({ where: { id } });
      if (!news) {
        return next(ApiError.notFound("Новость не найдена"));
      }
      return res.json(news);
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }
}

module.exports = new newsController();
