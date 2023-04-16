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

        /*  const { filename: path } = request.files */
        /*         const { file, field1, field2 } = request.files;
       
                const { name, price, category_id, offer, description } = request.body
       
               const product = await Product.create({
                   name,
                   description,
                   price: price,
                   category_id,
                   path,
                   offer
               })    
               
       
             
       
               return response.json(product) */


        const { file, img1 } = request.files;
 
        const { name, price, category_id, offer, description } = request.body;

        const product = await Product.create({
            name,
            description,
            price,
            category_id,
           // path: file[0].path, // caminho do arquivo enviado no campo "file"
            path: file[0].filename, // assumindo que há apenas um arquivo enviado para o campo "file"
            img1: img1[0].filename, // assumindo que há apenas um arquivo enviado para o campo "img1"
            offer
        }); 
     //console.log(file,img1)

        return response.json(product);

    

    } catch(err) {
        console.log(err)
    }

    // Essa rota retorna todos os produtos
    async index(request, response) {
        const products = await Product.findAll({
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name']
                }
            ]
        })

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