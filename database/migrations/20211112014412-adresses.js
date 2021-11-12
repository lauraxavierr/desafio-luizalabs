'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  return queryInterface.createTable('adresses', {
    id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			cep: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			rua: { 
				type: Sequelize.STRING,
				allowNull: false
			},
			cidade: {
				type: Sequelize.STRING,
				allowNull: false,
			},
      bairro:{
        type: Sequelize.STRING,
				allowNull: false,
      },
      estado: {
				type: Sequelize.STRING,
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
      return queryInterface.dropTable('adresses');

  }
};
