'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('products', 'previousPrice', {
      type: Sequelize.INTEGER,
      defaultValue: false,
      allowNull: false,
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('product', 'previousPrice');

  }
};
