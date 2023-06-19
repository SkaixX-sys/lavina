const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Users = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, allowNull: false},
    password: { type: DataTypes.STRING, allowNull: false},
    role: { type: DataTypes.STRING, allowNull: false},
})

module.exports = Users