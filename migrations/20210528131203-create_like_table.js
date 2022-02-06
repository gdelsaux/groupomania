'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('like', {
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
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Like')
  }
};
