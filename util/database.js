const Sequelize = require('sequelize');

const sequelize = new Sequelize('library-management', 'root', 'Akshubham8@', {
    dialect: 'mysql',
    host: 'localhost',
    dialectOptions: {
        dateStrings: true,
        typeCast: true,
      },
    timezone: "+05:30"
})

module.exports = sequelize;