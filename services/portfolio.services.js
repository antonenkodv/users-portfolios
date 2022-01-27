const portfolioRepositories = require('../repositories/portfolio.repositories')

const portfolioService = {
    create({name,description,user}) {
        return portfolioRepositories.create({name ,description, user})
    },
    getUserPortfolio({ id }){
        return portfolioRepositories.getUserPortfolio({ id})
    },
    deletePortfolio({portfolio_id}){
        return portfolioRepositories.deletePortfolio({portfolio_id})
    }

}

module.exports = portfolioService