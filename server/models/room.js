const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Rooms = sequelize.define('rooms', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    size: { type: DataTypes.INTEGER, allowNull: true },
    seats: { type: DataTypes.INTEGER, allowNull: true },
    weekendNewPrice: { type: DataTypes.DECIMAL(7,2), allowNull: true },
    weekendOldPrice: { type: DataTypes.DECIMAL(7,2), allowNull: true },
    weekdayNewPrice: { type: DataTypes.DECIMAL(7,2), allowNull: true },
    weekdayOldPrice: { type: DataTypes.DECIMAL(7,2), allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    title: { type: DataTypes.STRING, allowNull: true },
    typeOfHotel: { type: DataTypes.STRING, allowNull: true },
    isBusy: { type: DataTypes.BOOLEAN, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true },
});


module.exports = Rooms;
