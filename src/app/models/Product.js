/* Model para adicionar produto */

import Sequelize, { Model } from 'sequelize'

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
               /*  description: Sequelize.TEXT, */ ///TESTE */   Description
                price: Sequelize.STRING,
                path: Sequelize.STRING,
              /*   offer: Sequelize.BOOLEAN, */
                url: {
                    // Este campo não existe no banco de dados
                    // Gerando uma url quando o usuario solicita informações do produto
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `http://localhost:3001/product-file/${this.path}`
                    }
                }
            },
            {
                sequelize
            }
        )
        return this 
    }

    // Criando relacionamento entre tabelas

     static associate(models) {
        this.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'category'
        }) // category_id, esse campo é uma chave extrangeira, pois está fazendo referência a um campo da tabela de categorias.
    } 
}

export default Product



