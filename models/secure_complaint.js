'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Secure_complaint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Secure_complaint.init({
    data: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Secure_complaint',
  });
  return Secure_complaint;
};