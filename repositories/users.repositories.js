const {models : { User , Portfolio} } = require('../db/init_db')
const portfolioServices = require('../services/portfolio.services')
const bcrypt = require('bcrypt')
const uuid = require('uuid4')
const Auth = require('../auth')
const {errorHandler} = require("../validation");

const usersRepositories = {
    signUp({name, password, email}) {
        return bcrypt.hash(password, 12).then(hashedPassword => {
            const newUser = {
                id: uuid(),
                name,
                email,
                password: hashedPassword,
            }
            return User.create(newUser)
        })
            .catch((err) =>{throw new Error(err)})
    },
    signIn({password, email}) {
        return Auth.tryLogin({password , email})
    },
    refreshToken({refreshToken}){
        return Auth.refreshTokens({refreshToken})
    },
    logOut({id, email}){
        return User.update({status: 'OFFLINE'}, {where: {email ,id}, raw: true})
            .catch(()=>errorHandler('Something went wrong',500))
    },
    delete({user}){
      return Portfolio.findAndCountAll({where : { owner_id : user.id}, raw : true})
            .then(data =>{
                const promises = []
                data.rows.forEach(item =>promises.push(portfolioServices.deletePortfolio({portfolio_id : item.id})))
                return Promise.all(promises)
            })
           .catch(()=> errorHandler('Something went wrong',500))
           .then(() => User.destroy({where : { id : user.id}}))
           .catch(()=>errorHandler('Something went wrong',500))
    }
}

module.exports = usersRepositories