const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mobileNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING, // You can define roles as strings (e.g., 'admin', 'user')
    allowNull: false,
    defaultValue:"User"
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  lastLoginAt: {
    type: Sequelize.DATE,
  },
  
},{
  timestamps: false
});

module.exports = User;
