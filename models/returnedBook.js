const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ReturnedBook = sequelize.define('returnedBook',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    submitedOn: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fine: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = ReturnedBook;