/* Controller de Categorias. É aqui que vai chegar os dados */

import * as Yup from 'yup'
import Category from '../models/Category'
import User from '../models/User'

// Validação dos produtos
class CategoryController {
    async store(request, response) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required()
            })

            try {
                //  Teste para verificar as informações e retorna o erro
                await schema.validateSync(request.body, { abortEarly: false })
            } catch (err) {
                return response.status(400).json({ error: err.errors })
            }

            // Definido que só administradores podem criar uma nova categoria.
            // Verificando se o usuario é admin
            const { admin: isAdmin } = await User.findByPk(request.userId)

            if (!isAdmin) {
                return response.status(401).json()
            }

            const { name } = request.body

            /*   const { filename: path } = request.file   */

            // Validando categoria repetida
            const categoryExists = await Category.findOne({
                where: {
                    name,
                },
            })
          
 
            if (categoryExists) {
                return response
                    .status(400)
                    .json({ error: 'Category already exists' })
            }
 
            // Criando nova categoria
            const { id } = await Category.create({ name })

            return response.json({ name, id })
        } catch (err) {
            console.log(err)
        }
    }

    // Essa rota retorna todos os produtos
    async index(request, response) {
        const category = await Category.findAll()

        return response.json(category)
    }







    async update(request, response) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string()
            })

            try {
                //  Teste para verificar as informações e retorna o erro
                await schema.validateSync(request.body, { abortEarly: false })
            } catch (err) {
                return response.status(400).json({ error: err.errors })
            }

            // Definido que só administradores podem criar uma nova categoria.
            // Verificando se o usuario é admin
            const { admin: isAdmin } = await User.findByPk(request.userId)

            if (!isAdmin) {
                return response.status(401).json()
            }

            const { name } = request.body

            const { id } = request.params

            // Verificando se categoria existe
            const category = await Category.findByPk(id)

            if (!category) {
                return response
                    .status(401)
                    .json({ error: 'Make sure your category id is correct' })
            }

            let path
            if (request.file) {
                path = request.file.filename
            }

            // Atualizando categoria
            await Category.update({ name, path }, { where: { id } })

            return response.status(200).json()
        } catch (err) {
            console.log(err)
        }
    }
}

export default new CategoryController()