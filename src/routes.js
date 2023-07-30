//chamar usuarios para o banco de dados

import { Router } from "express"
import multer from "multer"
import multerConfig from './config/multer'
import authMiddleware from './app/middlewares/auth'

import CategoryController from "./app/controllers/CategoryController"
import ProductController from "./app/controllers/ProductController"
import SessionController from "./app/controllers/SessionController"
import UserController from "./app/controllers/UserController"
import OrderController from "./app/controllers/OrderController"
import FreightController from "./app/controllers/FreightController"
import PaymentController from "./app/controllers/PaymentController"




const upload = multer(multerConfig)


const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.Store)



//Quando um usuário tentar acessar qualquer rota a baixo do authMiddleware a função será executada primeiro.
//A authMiddlewarefunção verificará se o usuário está logado ou possui as credenciais necessárias para acessar as rotas protegidas.
routes.use(authMiddleware) 

routes.post("/products", upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'file2', maxCount: 1 },
  { name: 'file3', maxCount: 1 },
  { name: 'file4', maxCount: 1 },
]), ProductController.store);


// Rota para busca produtos pelo Nome
routes.get('/search/:name', ProductController.search)

// Rota para buscar todos os produtos
routes.get('/products', ProductController.index)
// Rota para buscar um produto específico com base no ID
routes.get('/products/:id', ProductController.index)

routes.put('/products/:id', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'file2', maxCount: 1 },
  { name: 'file3', maxCount: 1 },
  { name: 'file4', maxCount: 1 },
]), ProductController.update)

routes.delete('/products/:id', ProductController.delete);


routes.post("/categories", upload.single('file'), CategoryController.store)
routes.get('/categories', CategoryController.index)
routes.put('/categories/:id', upload.single('file'), CategoryController.update)


routes.post('/frete', FreightController.store);


//Quando um usuário tentar acessar qualquer rota a baixo do authMiddleware a função será executada primeiro.
//A authMiddlewarefunção verificará se o usuário está logado ou possui as credenciais necessárias para acessar as rotas protegidas.
//routes.use(authMiddleware) 

routes.post('/orders', OrderController.store)
routes.put('/orders/:id', OrderController.update)
routes.get('/orders', OrderController.index)
routes.get("/orders/last", OrderController.getLastOrder);


routes.post("/payment", PaymentController.store)



export default routes