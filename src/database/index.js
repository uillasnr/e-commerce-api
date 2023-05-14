// Criando conexão do model com o banco de dados

import Sequelize from "sequelize"
import Product from "../app/models/Product"

import User from "../app/models/User"
import Category from "../app/models/Category"
import mongoose from "mongoose"
import ConfigDatabase from "../config/database"



const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()

  }
  // Postbird banco de dados
  init() {
    this.connection = new Sequelize(ConfigDatabase)
    models
      .map((model) => model.init(this.connection))

      .map((model) => model.associate && model.associate(this.connection.models))
  };


  //conexão como o banco de dados mongo
  mongo() {

    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/Ecommerce',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
  }
}

export default new Database()
