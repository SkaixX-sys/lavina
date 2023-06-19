const room = require("../models/room");
const authenticateToken = require("../middlewares/authenticateToken");
const path = require("path");
const { uploadImage } = require("../middlewares/upload");
const fs = require("fs");
const ApiError = require("../Error/ApiError");
class roomController {
  async create(req, res, next) {
    try {
      let { type } = req.params;
      let {
        size,
        seats,
        weekendNewPrice,
        weekendOldPrice,
        weekdayNewPrice,
        weekdayOldPrice,
        description,
        title,
        isBusy,
        hotelId,
      } = req.body;
      if (req.user.role !== "admin") {
        return next(ApiError.forbidden("Доступ закрыт"));
      }
      const image = req.file ? path.basename(req.file.path) : null;
      if (
        !type ||
        !seats ||
        !description ||
        !image ||
        !weekendOldPrice ||
        !weekdayOldPrice ||
        !hotelId ||
        !title ||
        !size ||
        !isBusy
      ) {
        return next(ApiError.badRequest("Укажите все данные"));
      }
      const Room = await room.create({
        size,
        seats,
        weekendNewPrice,
        weekendOldPrice,
        weekdayNewPrice,
        weekdayOldPrice,
        description,
        title,
        typeOfHotel: type,
        isBusy,
        image,
        hotelId,
      });
      return res.json(Room);
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.badRequest("Укажите комнату"));
      }
      const {
        size,
        seats,
        weekendNewPrice,
        weekendOldPrice,
        weekdayNewPrice,
        weekdayOldPrice,
        description,
        title,
        typeOfHotel,
        isBusy,
        hotelId,
        type,
      } = req.body;
      if (req.user.role !== "admin") {
        return next(ApiError.forbidden("Доступ закрыт"));
      }
      const image = req.file ? path.basename(req.file.path) : null;
      const Room = await room.findOne({ where: { id } });
      if (!Room) {
        return next(ApiError.notFound("Запись не найдена"));
      }
      const updated = {
        size: size || Room.size,
        weekendNewPrice: weekendNewPrice || Room.weekendNewPrice,
        weekendOldPrice: weekendOldPrice || Room.weekendOldPrice,
        weekdayNewPrice: weekdayNewPrice || Room.weekdayNewPrice,
        weekdayOldPrice: weekdayOldPrice || Room.weekdayOldPrice,
        title: title || Room.title,
        description: description || Room.description,
        image: image || Room.image,
        seats: seats || Room.seats,
        typeOfHotel: typeOfHotel || Room.typeOfHotel,
        isBusy: isBusy || Room.isBusy,
        hotelId: hotelId || Room.hotelId,
        type: type || Room.type,
      };

      await room.update(updated, { where: { id } });
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

      // Найти запись в базе данных
      const roomToDelete = await room.findByPk(id);

      // Проверить, что запись существует
      if (!roomToDelete) {
        return next(ApiError.notFound("Запись не найдена"));
      }

      // Удалить запись из базы данных
      await room.destroy({ where: { id } });

      const image = roomToDelete.image;
      
      if (image) {
        try {
          const imagePath = path.join(__dirname, "..", "static", image);
          fs.unlinkSync(imagePath);
        } catch (e) {
        }
      }

      return res.json({ message: "Delete was successful" });
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }

  async getAll(req, res, next) {
    try {
      let { type } = req.params;
      if (!type) {
        return next(ApiError.badRequest("Тип не найден"));
      }
      const Room = await room.findAll({ where: { typeOfHotel: type } });
      if (!Room) {
        return next(ApiError.notFound("Комната не найдена"));
      }
      return res.json(Room);
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }

  async getOne(req, res, next) {
    try {
      let { id } = req.params;
      const Room = await room.findOne({ where: { id } });
      if (!Room) {
        return next(ApiError.notFound("Комната не найдена"));
      }
      return res.json(Room);
    } catch (e) {
      return next(ApiError.internal("Ошибка сервера"));
    }
  }
}

module.exports = new roomController();
