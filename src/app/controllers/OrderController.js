/* O controller é onde as informações vão entrar na aplicação. O controller vai manipular essas informações fazer algumas validações e depois chamar o Model pra gravar as informações no banco de dados */

import * as Yup from 'yup' // Yup valida os dados. O * representa todos os arquivos que devem ser exportados do Yup
import Category from '../models/Category'
import Product from '../models/Product'
import Order from '../schemas/Order'
import User from '../models/User'

class OrderController {
    async store(request, response) {
        // O metodo store vai cadastrar o novo usuario

        // Validando informações
        const schema = Yup.object().shape({
            products: Yup.array()
                .required()
                .of(
                    Yup.object().shape({
                        id: Yup.number().required(),
                        quantity: Yup.number().required(),
                    })
                ),
        })

        try {
            // Verifica as informações e retorna o erro
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const productsId = request.body.products.map((product) => product.id)


        // Pegando as informações do produto no postgres
        const updatedProducts = await Product.findAll({
            where: {
                id: productsId
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }
            ]
        })

        const editedProduct = updatedProducts.map((product) => {
            const productIndex = request.body.products.findIndex(
                (requestProduct) => requestProduct.id === product.id
            )

            const newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.name,
                url_img1: product.url_img1,
                quantity: request.body.products[productIndex].quantity,
            }
        
            return newProduct
        })

        let totalPrice = 0 // inicializa a variável com valor zero

        editedProduct.forEach((product) => {
          totalPrice += product.price * product.quantity // calcula o preço total de cada produto e acumula na variável
        })
        
        const order = {
            user: {
                id: request.userId,
                name: request.userName
            },
            products: editedProduct,
            status: 'Pedido realizado',
            totalPrice: totalPrice, // adiciona o valor total ao objeto order
        }
       
        const orderResponse = await Order.create(order)

        return response.status(201).json(orderResponse)
    }

     // Mostrar todos os pedidos
    async index(request, response) {
        const orders = await Order.find()

        return response.json(orders)
    }

    // Atualizando Status do pedido
    async update(request, response) {
        // Validando informações
        const schema = Yup.object().shape({
            status: Yup.string().required()
        })

        try {
            // Verifica as informações e retorna o erro
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        // Definindo que administradores podem atualizar pedidos
        const { admin: isAdmin } = await User.findByPk(request.userId)

        if (!isAdmin) {
            return response.status(401).json()
        }

        const { id } = request.params
        const { status } = request.body

        // Validando id de pedido
        try {
            await Order.updateOne({ _id: id }, { status })
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }

        return response.json({ message: 'Status updated sucessfully' })
    } 
}

export default new OrderController()