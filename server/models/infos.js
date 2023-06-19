const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Info = sequelize.define('info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING,  unique:true },
    title: { type: DataTypes.STRING, },
    image: { type: DataTypes.STRING, },
    description: { type: DataTypes.STRING, }
})

module.exports = Info