'use strict';
module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('PhoneType', {
    type: DataTypes.STRING
  }, {});
  model.associate = function(models) {
    // associations can be defined here
  };
  return model;
};