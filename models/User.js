const Sequelize = require('sequelize')
const sequelize = require('../database/connection')

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(150),
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = User;