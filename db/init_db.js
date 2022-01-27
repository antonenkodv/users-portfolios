const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const PortfolioModel = require('./models/portfolio')
const ImageModel = require('./models/image')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,{
    dialect: 'postgres',
    host : 'localhost',
    port : Number(5432)
})

const models = {
    User: UserModel(sequelize, Sequelize.DataTypes),
    Portfolio : PortfolioModel(sequelize , Sequelize.DataTypes),
    Image : ImageModel(sequelize,Sequelize.DataTypes)
}

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models)
    }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports={models , sequelize}

