'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PhoneTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      return queryInterface.bulkInsert('PhoneTypes', [{
        type: 'home',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        type: 'work',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        type: 'mobile',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        type: 'office',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PhoneTypes');
  }
};