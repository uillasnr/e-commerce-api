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
          /*   description: Yup.string().required(), */
            price: Yup.number().required(),
            category_id: Yup.number().required(),
            /* offer: Yup.boolean() */
        })


        try {
            //  Teste para verificar as informações e retorna o erro
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }


        // Definindo que apenas administradores podem criar um novo produto
        /* const { admin: isAdmin } = await User.findByPk(request.userId)

        if (!isAdmin) {
            return response.status(401).json()
        } */

        const { filename: path } = request.file
        const { name, price, category_id } = request.body

        const product = await Product.create({
            name,
         /*    description, */
            price: price,
            category_id,
            path,
            
        })

        ///const file = request.file
        //console.log(file)
        return response.json(product)
    } catch(err) {
        console.log(err)
    }


     // Essa rota retorna todos os produtos
     async index(request, response) {
        const products = await Product.findAll({
          /*   include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name']
                }
            ] */
        })

        console.log(request.userId) 
        return response.json(products)
    }

    
}
    export default new ProductController()