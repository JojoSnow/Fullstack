const { DataTypes } = require('sequelize');

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('blogs', {
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
				default: 0
			},
			year: {
				type: DataTypes.INTEGER,
				validate: {
					min: {
						args: 1991,
						error: "Year has to be after 1991"
					},
					max: 2022
				}
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false
			}
		});
		await queryInterface.createTable('users', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			username: {
				type: DataTypes.STRING,
				validate: {
					isEmail: {
						error: 'Validation isEmail on username failed'
					}
				},
				unique: true,
				allowNull: false
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false
			}
		});
		await queryInterface.addColumn('blogs', 'user_id', {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: 'users', key: 'id' },
		});
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('blogs');
		await queryInterface.dropTable('users');
	}
};