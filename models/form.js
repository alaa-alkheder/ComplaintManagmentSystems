'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  form.init({
    form: {
      type:DataTypes.JSON,
      allowNull:false
    },
    path: {
      type:DataTypes.STRING,
      allowNull:false

    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
        type: {
      type:DataTypes.STRING,
          allowNull:false
    },
        department: {
      type:DataTypes.STRING,
          allowNull:false
    },
    signed: {
      type:DataTypes.BOOLEAN,
      allowNull:false
    },



  }, {
    sequelize,
    modelName: 'form',
  });
  return form;
};