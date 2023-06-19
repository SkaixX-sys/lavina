const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Image = sequelize.define('image', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image: { type: DataTypes.STRING, allowNull: false },
})

module.exports = Image