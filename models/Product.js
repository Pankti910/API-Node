const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  size: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  colour:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  price:{
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  quantity:{
    type: Sequelize.NUMBER,
    allowNull: false,
  }
  
},{
  timestamps: false
});

module.exports = Product;
