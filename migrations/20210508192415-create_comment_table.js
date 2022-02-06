'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('comment', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      PostId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Post',
          key: 'id',
          as: 'PostId'
        }
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id',
          as: 'UserId',
        }
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
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comment')
  }
};