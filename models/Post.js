const Sequelize = require('sequelize');
const sequelize = require('../database/connection')
const User = require('./User');

const Post = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    data: {
        type: Sequelize.STRING(300),
        allowNull: true,
    },
    post_img: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

User.hasMany(Post, {onDelete: 'cascade'});
Post.belongsTo(User, {onDelete: 'cascade'});

module.exports = Post;