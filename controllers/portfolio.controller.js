const portfolioService = require('../services/portfolio.services')
const {validateParams, errorHandler} = require("../validation");

const portfolioController = {
    async create(req, res) {
        try {
            const {body: {name , description}, user} = req

            if(!validateParams([name , description],"string")){
                errorHandler('Invalid input parameters',400)
            }

            await portfolioService.create({name , description , user})

            res.status(200).json({ok : true ,message: 'OK'})
        } catch (err) {
            res.status(err.code).json({ ok : false ,message : err.message})
        }
    },
    async getUserPortfolio(req, res) {
        try {
            const {user} = req
            const response = await portfolioService.getUserPortfolio({id: user.id})
            res.status(200).send({ ok : true  , response})
        } catch (err) {
            res.status(err.code).json({ ok : false ,message : err.message})
        }
    },
    async deletePortfolio(req, res){
        try{
            const {portfolio_id} = req.body // validate in middleware isOwner
            const response = await portfolioService.deletePortfolio({portfolio_id})
            res.status(200).json({ok : true , message : "Successfully deleted", response})
        }catch(err){
            res.status(500).json({ok : false , message : err.message})
        }
    }


}
module.exports = portfolioController