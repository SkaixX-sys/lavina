const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Service = sequelize.define('service', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, unique: true },
    title: { type: DataTypes.STRING, },
    description: { type: DataTypes.STRING, },
    image: { type: DataTypes.STRING, },
})

module.exports = Service