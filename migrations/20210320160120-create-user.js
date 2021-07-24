'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
        type: DataTypes.STRING,
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
      next_Edit: {
        type: DataTypes.DATE
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('users');
  }
};