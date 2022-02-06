const Sequelize = require('sequelize');
const sequelize = require('../database/connection')

//models
const Post = require('./Post');
const User = require('./User');

const Like = sequelize.define('like', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  }
}, {
  timestamps: false,
  freezeTableName: true,
});

User.hasMany(Like, {onDelete: 'cascade'});
Post.hasMany(Like, {onDelete: 'cascade'});

Like.belongsTo(User, {onDelete: 'cascade'});
Like.belongsTo(Post, {onDelete: 'cascade'});

module.exports = Like;
