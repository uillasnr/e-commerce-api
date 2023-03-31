'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('categories', {
            id: {
                type: Sequelize.INTEGER,

                allowNull: false,

                autoIncrement: true,

                primaryKey: true
            },

            name: {
                type: Sequelize.STRING,

                allowNull: false,

                unique: true
            },

            created_at: {
                // Esse campo vai colocar a data que as informações inseridas foram criadas

                type: Sequelize.DATE,

                allowNull: false
            },

            updated_at: {
                // Esse campo sempre vai ter a data da ultima atualização feita pelo usúario

                type: Sequelize.DATE,

                allowNull: false
            }
        })
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('categories')
    }
}