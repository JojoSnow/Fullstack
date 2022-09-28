const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../utils/db');

class ReadingList extends Model {}

ReadingList.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	read: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	listId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'lists', key: 'id' }
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' }
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
	modelName: 'reading_lists'
});

module.exports = ReadingList;