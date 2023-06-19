const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Album = sequelize.define('album', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING },
})

module.exports = Album