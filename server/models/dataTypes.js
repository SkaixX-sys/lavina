const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const dataTypes = sequelize.define('dataTypes', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    item: { type: DataTypes.STRING },
    relateTo: {
        type: DataTypes.ENUM,
        values: ['serviceTypes', 'infoTypes', "nothing"],
        defaultValue: "nothing"
    },

})

module.exports = dataTypes