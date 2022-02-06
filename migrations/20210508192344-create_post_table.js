'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('post', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id',
          as: 'UserId',
        }
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
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Post');
  }
};