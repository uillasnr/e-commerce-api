/* Model para adicionar produto */

import Sequelize, { Model } from 'sequelize'

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                description: Sequelize.TEXT,
                price: Sequelize.STRING,
                previou_price: Sequelize.STRING,
                path_1: Sequelize.STRING,
                path_2: Sequelize.STRING,
                path_3: Sequelize.STRING,
                path_4: Sequelize.STRING,
                offer: Sequelize.BOOLEAN,
                news: Sequelize.BOOLEAN,

                url_img1: {
                    // Este campo não existe no banco de dados
                    // Gerando uma url quando o usuario solicita informações do produto
                    type: Sequelize.VIRTUAL,

                    get() {
                        return `http://localhost:3001/product-file/${this.id}/${this.path_1}`

                    }
                },
                url_img2: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `http://localhost:3001/product-file/${this.id}/${this.path_2}`
                    }
                },
                url_img3: {
                    type: Sequelize.VIRTUAL,

                    get() {
                        return `http://localhost:3001/product-file/${this.id}/${this.path_3}`
                    }
                },
                url_img4: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `http://localhost:3001/product-file/${this.id}/${this.path_4}`
                    }
                },

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
        }), // category_id, esse campo é uma chave extrangeira, pois está fazendo referência a um campo da tabela de categorias.

            // Corrija o relacionamento com o modelo ProductRating
            this.hasMany(models.ProductRating, {
                foreignKey: 'productId', // Nome correto da chave estrangeira
                as: 'ratings', // Nome correto do relacionamento
            });
    }
}

export default Product



