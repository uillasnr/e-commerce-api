'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('products', 'previousPrice', {
      type: Sequelize.INTEGER,
      defaultValue: null,
      allowNull: true,
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('product', 'previousPrice');

  }
};
