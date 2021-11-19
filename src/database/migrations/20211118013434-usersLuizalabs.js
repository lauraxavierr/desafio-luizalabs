'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('usersLuizalabs', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			senha: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			cep: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			rua: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			bairro: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			cidade: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			estado: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			token: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			ultimo_login: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			expira_login: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			}
		})
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('usersLuizalabs');

	}
};