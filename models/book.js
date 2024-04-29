const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Book = sequelize.define('book',{
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
    takenOn: {
        type: Sequelize.STRING,
        allowNull: false
    },
    returnOn: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Book;