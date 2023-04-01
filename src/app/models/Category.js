/* Model para fazer a interface entre a aplicação e o banco de dados */

import Sequelize, { Model } from 'sequelize'

class Category extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
               /*  path: Sequelize.STRING, */
                url: {
                    // Este campo não existe no banco de dados
                    // Gerando uma url quando o usuario solicita informações do produto
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `http://localhost:3000/category-file/${this.path}`
                    }
                }
            },
            {
                sequelize
            }
        )

        return this
    }
}

export default Category