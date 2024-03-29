const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../utils/db');

class List extends Model {}

List.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    }
}, {
	sequelize,
	underscored: true,
	timestamps: false,
	modelName: 'lists'
});

module.exports = List;