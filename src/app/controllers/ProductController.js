/* Controller de Produtos */

import * as Yup from 'yup'
import Product from '../models/Product'
import Category from '../models/Category'
import User from '../models/User'


// Validação dos produtos
class ProductController {
    async store(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string().required(),
            price: Yup.number().required(),
            previou_price: Yup.number(),
            category_id: Yup.number().required(),
            offer: Yup.boolean(),
            news: Yup.boolean(),
        })

        try {
            //  Teste para verificar as informações e retorna o erro
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        // Definindo que apenas administradores podem criar um novo produto
        const { admin: isAdmin } = await User.findByPk(request.userId)

        if (!isAdmin) {
            return response.status(401).json()
        }

        const { file, file2, file3, file4 } = request.files;
        const { name, price, previou_price, category_id, offer, news, description, } = request.body;

        const product = await Product.create({
            name,
            description,
            price,
            previou_price,
            category_id,
            path_1: file[0].filename,
            path_2: file2[0].filename,
            path_3: file3[0].filename,
            path_4: file4[0].filename,
            offer,
            news
        });

        return response.json(product);

    } catch(err) {
        console.log(err)
    }



    // Busca produtos pelo Nome
    async search(request, response) {
        const { name } = request.params;
        const { Op } = require('sequelize');


        if (!name) {
            return response.status(400).json({ error: 'this product does not exist' });
        }


        const products = await Product.findAll({

            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name']
                }
            ]
        })

        return response.json(products);
    }



    // Busca de Todos  produtos 
    async index(request, response) {
        const { id } = request.params

        let products

        if (id) {
            // Busca o produto com o ID especificado
            products = await Product.findByPk(id, {
                include: [
                    {
                        model: Category,
                        as: 'category',
                        attributes: ['id', 'name']
                    }
                ]
            })
        } else {
            // Busca todos os produtos
            products = await Product.findAll({
                include: [
                    {
                        model: Category,
                        as: 'category',
                        attributes: ['id', 'name']
                    }
                ]
            })
        }

        console.log(request.userId)
        return response.json(products)
    }




    /* Metodo para editar produtos */
    async update(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            description: Yup.string(),
            price: Yup.number(),
            previou_price: Yup.number(),
            category_id: Yup.number(),
            offer: Yup.boolean(),
            news: Yup.boolean()
        })

        try {
            //  Teste para verificar as informações e retorna o erro
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        // Definindo que apenas administradores podem criar um novo produto
        const { admin: isAdmin } = await User.findByPk(request.userId)

        if (!isAdmin) {
            return response.status(401).json()
        }

        // Verifica se o produto existe
        const { id } = request.params

        const product = await Product.findByPk(id)

        if (!product) {
            return response
                .status(401)
                .json({ error: 'Make sure your product ID is correct' })
        }

        // Verificando se o usuario está enviando uma imagem
        let path_1
        if (request.file) {
            path_1 = request.file.filename
        }


        const { name, price, previou_price, category_id, offer, news, description } = request.body

        await Product.update(
            {
                name,
                description,
                price,
                previou_price,
                category_id,
                path_1,
                offer,
                news
            },
            { where: { id } }
        )

        return response.status(200).json()
    }




    //Deletar produto
    async delete(request, response) {
        // Verificando se o usuário é um administrador
        const { admin: isAdmin } = await User.findByPk(request.userId);
        if (!isAdmin) {
            return response.status(401).json();
        }

        // Obtendo o ID do produto a ser deletado
        const { id } = request.params;

        // Verificando se o produto existe
        const product = await Product.findByPk(id);
        if (!product) {
            return response
                .status(404)
                .json({ error: 'Product not found' });
        }

        // Deletando o produto
        await Product.destroy({ where: { id } });

        return response.status(200).json();
    }



}

export default new ProductController()



