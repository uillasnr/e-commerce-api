import express from 'express'
import routes from './routes'
import { resolve } from 'path'
import cors from 'cors'

import './database'


class App {
    constructor() {
        this.app = express()
         this.app.use(cors()) 

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(express.json())
         this.app.use(
            '/product-file', // Avisa qual rota vai servir os arquivos estaticos
            express.static(resolve(__dirname, '..', 'uploads')) // Procura o arquivo correspondente ao nome que geramos
        ) 

         this.app.use(
            '/category-file', // Avisa qual rota vai servir os arquivos estaticos
            express.static(resolve(__dirname, '..', 'uploads')) // Procura o arquivo correspondente ao nome que geramos
        ) 
    }

    routes() {
        this.app.use(routes)
    }
}

export default new App().app