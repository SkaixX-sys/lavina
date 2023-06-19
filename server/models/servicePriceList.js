const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ServicePriceList = sequelize.define("servicePriceList", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  period: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.STRING, allowNull: true },
  weekendNewPrice: { type: DataTypes.DECIMAL(7, 2), allowNull: true },
  weekendOldPrice: { type: DataTypes.DECIMAL(7, 2), allowNull: true },
  weekdayNewPrice: { type: DataTypes.DECIMAL(7, 2), allowNull: true },
  weekdayOldPrice: { type: DataTypes.DECIMAL(7, 2), allowNull: true },
  quantity: { type: DataTypes.INTEGER, allowNull: true },
  type: { type: DataTypes.STRING, allowNull: true },
});

module.exports = ServicePriceList;
