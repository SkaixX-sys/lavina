const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Hotels = sequelize.define('hotels', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, allowNull: false, unique:true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    isFullBusy: { type: DataTypes.BOOLEAN, allowNull: false },
})

module.exports = Hotels