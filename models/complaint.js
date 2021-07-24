'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Complaint extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({User}) {
            // define association here
            this.belongsTo(User, {foreignKey: 'userId'});
        }
    };
    Complaint.init({
        userId: {
            type: DataTypes.INTEGER
        },
        data: {
            type: DataTypes.JSON
        },
        status: {
            type: DataTypes.INTEGER
        },
        flow: {
            type: DataTypes.JSON,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'Complaints',
        modelName: 'Complaint',
    });
    return Complaint;
};