'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Employees', {
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
      userId:{
        type: DataTypes.INTEGER,
        allowNull:false
      },
      role:  {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      department: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      block:  {
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Employees');
  }
};