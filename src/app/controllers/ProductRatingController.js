import * as Yup from 'yup';
import Product from '../models/Product';
import User from '../models/User';
import ProductRating from '../models/ProductRating';

class ProductRatingController {
    // Função para avaliar e comentar o  produto

    async store(request, response) {
        const schema = Yup.object().shape({
            rating: Yup.number().min(0).max(5),
            comment: Yup.string(),
            createdAt: Yup.string(),
            userId: Yup.string().required(),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { id } = request.params;
        const { rating, comment, createdAt, userId } = request.body; // Obter o nome do usuário da requisição

        // Verifica se o produto existe
        const product = await Product.findByPk(id);
        if (!product) {
            return response.status(404).json({ error: 'Product not found' });
        }

        try {
            const productRating = await ProductRating.create({
                rating,
                comment,
                createdAt,
                productId: product.id,
                userId,
            });

            // Retornar a avaliação junto com o nome do usuário
            const ratingWithUserName = {
                rating: productRating.rating,
                comment: productRating.comment,
                createdAt: productRating.createdAt,
                userId:productRating.userId, // Corrigido para user, que é o nome do usuário fornecido na requisição
            };
            return response.status(200).json(ratingWithUserName);
        } catch (err) {
            console.error(err);
            return response.status(500).json({ error: 'Failed to rate the product' });
        }
    }

    // Método para obter todas as avaliações de um produto
    async getAllRatings(request, response) {
        const { id } = request.params;

        try {
            // Verifica se o produto existe
            const product = await Product.findByPk(id);
            if (!product) {
                return response.status(404).json({ error: 'Product not found' });
            }

            // Buscar todas as avaliações do produto
            const ratings = await ProductRating.findAll({
                 where: { productId: product.id },
                attributes: ['rating', 'comment', 'createdAt', 'userId'], 
            });

         

            return response.status(200).json(ratings); 
            console.log(ratings)
        } catch (err) {
            console.error(err);
            return response.status(500).json({ error: 'Failed to get ratings for the product' });
        }
    }
}




export default new ProductRatingController();
