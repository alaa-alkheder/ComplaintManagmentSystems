'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Employee}) {
      // define association here
this.hasOne(Employee,{foreignKey:'userId'})
    }

    toJSON(){
      // return {...this.get(),id:undefined};
      return {...this.get()};
    }
  };
  User.init({
    UUID: {
      type: DataTypes.UUID,
     defaultValue:DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull:false
    },
      lastName: {
        type: DataTypes.STRING,
        allowNull:false
      },
      email: {
        type: DataTypes.STRING,
        allowNull:false
      },
    phone: {
      type: DataTypes.STRING,
      allowNull:false
    },
    role:  {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    block:  {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    password:  {
      type: DataTypes.STRING,
      allowNull:false
    },
    next_Edit:  {
      type: DataTypes.DATE, 
    },
  }, {
    sequelize,
    tableName:'users',
    modelName: 'User',
  });
  return User;
};