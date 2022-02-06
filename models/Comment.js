const Sequelize = require('sequelize');
const sequelize = require('../database/connection')

const User = require('./User');
const Post = require('./Post');

const Comment = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    data: {
        type: Sequelize.STRING(300),
        allowNull: true,
    },
    comment_img: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

User.hasMany(Comment, {onDelete: 'cascade'});
Post.hasMany(Comment, {onDelete: 'cascade'});

Comment.belongsTo(User, {onDelete: 'cascade'});
Comment.belongsTo(Post, {onDelete: 'cascade'});

module.exports = Comment;
