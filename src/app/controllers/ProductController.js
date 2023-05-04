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
            category_id: Yup.number().required(),
            offer: Yup.boolean()
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
        const { name, price, category_id, offer, description } = request.body;

        const product = await Product.create({
            name,
            description,
            price,
            category_id,
            path_1: file[0].filename, // assumindo que há apenas um arquivo enviado para o campo "file[0]"
            path_2: file2[0].filename,
            path_3: file3[0].filename,
            path_4: file4[0].filename,
            offer
        });

        return response.json(product);

    } catch(err) {
        console.log(err)
    }
    /////////////////////////////////////////////////////////////////////////////////////////////
    //buscar o produto pelo nome
    async search(request, response) {
         const { name } = request.query;
        const { Op } = require('sequelize');

        /*   if (!name) {
             return response.status(400).json({ error: 'Nome do produto não fornecido' });
         } */

        // Busca produtos pelo nome
        const products = await Product.findAll({
            attributes: ['name'],
            where: {
                name: {
                    [ Op.iLike]: `%uillas%`
                }               /*  '%Nome do produto%' */ //se passar assim da serto
            },
            /*    include: [
                  {
                      model: Category,
                      as: 'category',
                      attributes: ['id', 'name']
                  }
              ]  */
        })
   /*  const productNames = products.map(product => product.name);
    console.log(productNames) */;
        //console.log(products)
        return response.json(products);
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

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






    /* Metodo para editar produto */
    async update(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            description: Yup.string(),
            price: Yup.number(),
            category_id: Yup.number(),
            offer: Yup.boolean()
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
        let path
        if (request.file) {
            path = request.file.filename
        }

        const { name, price, category_id, offer, description } = request.body

        await Product.update(
            {
                name,
                description,
                price,
                category_id,
                path,
                offer
            },
            { where: { id } }
        )

        return response.status(200).json()
    }
}

export default new ProductController()



