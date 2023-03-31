/* Middlewares para verificar o token */

import jwt from 'jsonwebtoken'
import authConfg from '../../config/auth'

export default (request, response, next) => {
    const authToken = request.headers.authorization

    // Verificando se o usuário mandou o middleware
    if (!authToken) {
        return response.status(401).json({ error: 'Token not provided' })
    }

    // Verificando se o token é valido
    const token = authToken.split(' ')[1] // Cada vez que o split encontra um espaço ele cria um novo item. Então ele cria duas posições o Bearer e o token. Nesse caso ele está retornando a posição 1 o token.

    // Chamando o JWT para verificar se o token é válido.
    try {
        jwt.verify(token, authConfg.secret, function (err, decoded) {
            if (err) {
                throw new Error()
            }

            request.userId = decoded.id
            request.userName = decoded.name

            return next()
        })
    } catch (err) {
        return response.status(401).json({ error: 'Token is invalid' })
    }
}