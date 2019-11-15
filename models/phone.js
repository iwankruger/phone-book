'use strict';
module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Phone', {
    number: DataTypes.STRING,
    phoneTypeId: DataTypes.INTEGER,
    contactId: DataTypes.INTEGER
  }, {});
  model.associate = function(models) {
    // associations can be defined here
  };
  return model;
};