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
    static associate({User,Department,Role}) {
      // define association here
      this.belongsTo(User,{foreignKey:'userId'});
      // this.hasOne(Role,{foreignKey:'role'});
      this.belongsTo(Department,{foreignKey:'department'});

    }
  };
  Employee.init({
    department: {
      type:DataTypes.INTEGER,
    },
        block:  {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    role:  {
      type: DataTypes.INTEGER,
      allowNull:false
    },
  }, {
    sequelize,
    tableName:'Employees',
    modelName: 'Employee',
  });
  return Employee;
};