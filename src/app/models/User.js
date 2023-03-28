//informaçoes de usuarios
import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcrypt'

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,  //gravar a senha virtualmente e não exposta no banco de dados
                password_hash: Sequelize.STRING,
                admin: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        )
        //criptografia de senha de usuarios
         this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 10)
            }
        }) 
        return this
    }
    //vai comparar a senha do
    // Login com a senha que esta no banco de dados se e a  mesma
     checkPassword(password) {
        return bcrypt.compare(password, this.password_hash)
    } 
}
export default User