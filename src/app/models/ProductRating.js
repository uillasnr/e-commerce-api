// Importe os módulos necessários
import Sequelize, { Model } from 'sequelize';

class ProductRating extends Model {
  static init(sequelize) {
    super.init(
      {
        rating: Sequelize.INTEGER,
        comment: Sequelize.STRING,
       // createdAt: Sequelize.DATE, // Corrigido para o tipo correto de dados
      },
      {
        sequelize,
        tableName: 'ProductRatings', // Especifique o nome correto da tabela
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: 'productId', // Nome correto da chave estrangeira
      as: 'product', // Nome correto do relacionamento
    });

    this.belongsTo(models.User, { // Associação com o modelo User
      foreignKey: 'userId',
      as: 'user',
    });
  }
}

export default ProductRating;
