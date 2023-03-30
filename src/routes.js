//chamar usuarios para o banco de dados

import { Router } from "express"
import multer from "multer"
import multerConfig from './config/multer'
import ProductController from "./app/controllers/ProductController"
import SessionController from "./app/controllers/SessionController"
import UserController from "./app/controllers/UserController"

const Upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.Store)

routes.post('/products', Upload.single('file'), ProductController.store)
routes.get('/products',  ProductController.index)

   

export default routes