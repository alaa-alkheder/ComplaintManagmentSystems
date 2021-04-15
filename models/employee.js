'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Department}) {
      // define association here
      this.belongsTo(User,{foreignKey:'userId'});
      this.belongsTo(Department,{foreignKey:'department'});

    }
  };
  Employee.init({
    department: {type:DataTypes.INTEGER,},
        block:  {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
  }, {
    sequelize,
    tableName:'employee',
    modelName: 'Employee',
  });
  return Employee;
};