const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const InfoItem = sequelize.define('infoItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING, },
    type: { type: DataTypes.STRING, },
})

module.exports = InfoItem