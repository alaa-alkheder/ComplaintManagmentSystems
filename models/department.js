'use strict';
const e = require('express');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Employee}) {
      // define association here
      this.hasMany(Employee,{foreignKey:'department'});
    }
  };
  Department.init({
    name: {
      type: DataTypes.STRING
    },
    // complaint_form: {
    //   type: DataTypes.STRING,
    //   allowNull:false
    // },
    supervisor: {
      type: DataTypes.STRING
    },
    parent: {
      type: DataTypes.INTEGER
    },
    block:  {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    }
  }, {
    sequelize,
    tableName:'Departments',
    modelName: 'Department',
  });
  return Department;
};