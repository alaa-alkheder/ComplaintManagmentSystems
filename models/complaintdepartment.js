'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ComplaintDepartment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  };
  ComplaintDepartment.init({
    departmentId: DataTypes.INTEGER,
    from: DataTypes.INTEGER,
    to: DataTypes.INTEGER,
    note: DataTypes.STRING
  }, {
    sequelize,
    tableName:'complaintDepartment',
    modelName: 'ComplaintDepartment',
  });
  return ComplaintDepartment;
};