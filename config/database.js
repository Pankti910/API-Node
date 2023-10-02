const Sequelize = require('sequelize');

const sequelize = new Sequelize('drcsystem', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
