const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../utils/db');

class Blog extends Model {}

Blog.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	author: {
		type: DataTypes.STRING,
		allowNull: false
	},
	url: {
		type: DataTypes.STRING,
		allowNull: false
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	likes: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	year: {
		type: DataTypes.INTEGER,
		defaultValue: null,
		validate: {
			min: {
				args: 1991,
				msg: "Year has to be after 1991"
			},
			max: {
				args: 2022,
				msg: "Year has to be before 2022"
			}
		}
	}
}, {
	sequelize,
	underscored: true,
	timestamps: true,
	modelName: 'blog'
});

module.exports = Blog;