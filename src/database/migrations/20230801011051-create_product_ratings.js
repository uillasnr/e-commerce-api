'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductRatings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      createdAt: {
        allowNull: false, // Não permite valores nulos
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'), // Define o valor padrão como a data/hora atual
      },
      updatedAt: {
        allowNull: false, // Não permite valores nulos
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'), // Define o valor padrão como a data/hora atual
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductRatings');
  }
};
