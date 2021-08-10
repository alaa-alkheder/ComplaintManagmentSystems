'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Complaints', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER
      },  
      status: {
        type: DataTypes.INTEGER
      },
      data: {
        type: DataTypes.JSON
      },
      form: {
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.STRING
      },
      flow: {
        type:DataTypes.JSON,
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
    await queryInterface.dropTable('Complaints');
  }
};