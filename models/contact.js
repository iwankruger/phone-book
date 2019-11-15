'use strict';
module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Contact', {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    note: {
      type: DataTypes.BLOB,
      get() {
        // return blob as text
        const value = this.getDataValue('note');
        if (value) return value.toString('utf8');

        return value;

        return this.getDataValue('note').toString('utf8');
      }

    }
  }, {});
  model.associate = function(models) {
    // associations can be defined here
    models.Contact.hasMany(models.Phone, {foreignKey: "contactId"});
  };
  return model;
};