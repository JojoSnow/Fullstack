const { DataTypes } = require('sequelize');

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('reading_lists', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			blog_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'blogs', key: 'id' }
			}
		});
		await queryInterface.createTable('lists', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
			read: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'users', key: 'id' }
			}
        });
		await queryInterface.addColumn('reading_lists', 'list_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'lists', key: 'id' },
        })
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('reading_lists');
		await queryInterface.dropTable('lists');
	}
};