'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Employee}) {
      // define association here
      // this.belongsTo(Employee,{foreignKey:'role'});
    }
  };
  role.init({
    name: {
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'role',
    tableName:'roles'
  });
  return role;
};