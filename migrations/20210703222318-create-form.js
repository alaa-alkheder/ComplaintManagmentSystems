'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('forms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      path: {
        type:DataTypes.STRING,
        allowNull:false
      },
      form: {
        type:DataTypes.JSON,
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
    await queryInterface.dropTable('forms');
  }
};