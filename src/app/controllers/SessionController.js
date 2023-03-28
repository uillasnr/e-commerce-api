//tela de login de usuarios


import * as yup from "yup"
import User from "../models/User"
import Jwt from "jsonwebtoken"
//import authConfig from "../../config/auth"

class SessionController {
    async Store(request, response) {
        const schema = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required(),
        })


        //caso o usuario coloque a senha ou email errado
        const userEmailOrPasswordIncorrect = () => {
            return response
                .status(401)
                .json({ error: "Make sure your password or email are correct" })
        }

        if (!(await schema.isValid(request.body))) userEmailOrPasswordIncorrect()


        const { email, password } = request.body

        const user = await User.findOne({
            where: { email },
        })

        if (!user) userEmailOrPasswordIncorrect()

        if (!(await user.checkPassword(password))) userEmailOrPasswordIncorrect()

        return response.json({
            id: user.id,
            email,
            name: user.name,
            admin: user.admin,
          /*   token: Jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }), */
        })
    }
}

export default new SessionController()








