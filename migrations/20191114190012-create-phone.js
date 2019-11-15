'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Phones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      contactId: {
        type: Sequelize.INTEGER,
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
      return queryInterface.addIndex('Phones', ['contactId']);
    }).then(() => {
      return queryInterface.addConstraint('Phones', ['phoneTypeId'], {
        type: 'FOREIGN KEY',
        name: 'phones_phoneTypeId_fkey',
        references: {
            table: 'PhoneTypes',
            field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'cascade',
      });
    }).then(() => {
      return queryInterface.addConstraint('Phones', ['contactId'], {
        type: 'FOREIGN KEY',
        name: 'phones_contactId_fkey',
        references: {
            table: 'Contacts',
            field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'cascade',
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Phones');
  }
};