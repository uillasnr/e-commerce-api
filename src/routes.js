//chamar usuarios para o banco de dados

import { Router } from "express"
import multer from "multer"
import multerConfig from './config/multer'
import authMiddleware from './app/middlewares/auth'

import CategoryController from "./app/controllers/CategoryController"
import ProductController from "./app/controllers/ProductController"
import SessionController from "./app/controllers/SessionController"
import UserController from "./app/controllers/UserController"

const upload = multer(multerConfig)


const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.Store)

routes.use(authMiddleware) //será chamado por todas as rotas ABAIXO.

//routes.post("/products", upload.single('file'), ProductController.store)

routes.post("/products", upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'file2', maxCount: 1 },
  { name: 'file3', maxCount: 1 },
  { name: 'file4', maxCount: 1 },
]), ProductController.store);


// Rota para buscar todos os produtos
routes.get('/products', ProductController.index)

// Rota para buscar um produto específico com base no ID
routes.get('/products/:id', ProductController.index)

routes.put('/products/:id', upload.single('file'), ProductController.update)

routes.post("/categories", upload.single('file'), CategoryController.store)
routes.get('/categories', CategoryController.index)
routes.put('/categories/:id', upload.single('file'), CategoryController.update)


export default routes