//chamar usuarios para o banco de dados

import { Router } from "express"
import SessionController from "./app/controllers/SessionController"
import UserController from "./app/controllers/UserController"


const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.Store)

   

export default routes