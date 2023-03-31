//chamar usuarios para o banco de dados

import { Router } from "express"
import multer from "multer"
import multerConfig from './config/multer'
import authMiddleware from './app/middlewares/auth'

import CategoryController from "./app/controllers/CategoryController"
import ProductController from "./app/controllers/ProductController"
import SessionController from "./app/controllers/SessionController"
import UserController from "./app/controllers/UserController"

const Upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.Store)

routes.use(authMiddleware) //será chamado por todas as rotas ABAIXO.

routes.post('/products', Upload.single('file'), ProductController.store)
routes.get('/products',  ProductController.index)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)
   

export default routes