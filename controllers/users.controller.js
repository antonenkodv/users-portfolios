const userServices = require('../services/users.services')
const {validateParams , errorHandler} = require('../validation')

const usersController = {
    async signUp(req, res) {
        try {
            const {name , password , email} = req.body

            if (!validateParams([name , password , email] , "string")){
                errorHandler('Invalid input parameters' , 400)
            }

            await userServices.signUp({name , password , email})

            res.status(200).json({ok : true ,message : 'User was created' })
        } catch (err) {
            res.status(err.code).json({ok : false , message : err.message})
        }
    },
    async signIn(req,res){
        try{
            const {email , password} = req.body

            if (!validateParams([email , password] , "string")){
                errorHandler('Invalid input parameters' , 400)
            }

            const response = await userServices.signIn({email , password})

            res.status(200).json(response)
        }catch (err){
            res.status(err.code).json({ok : false , message : err.message})
        }
    },
      refreshTokens(req,res){
          try {
              const {refreshToken} = req.body

              if (!validateParams([refreshToken] , "string")){
                  errorHandler('Invalid input parameters' , 400)
              }

              const response = userServices.refreshTokens({refreshToken})

              res.status(200).json({ok : true , response })
          } catch (err) {
              res.status(err.code).json({ok : false , message : err.message})
          }
    },
    async logOut(req,res){
        try{
            const {id , email} = req.user

            if (!validateParams([id] , "uuid") || !validateParams([email] , "string") ){
                errorHandler('Invalid input parameters' , 400)
            }

            await userServices.logOut({id , email})

            res.status(200).json({ok : true , message : 'OK'})
        }catch(err){
            res.status(err.code).json({ok : false , message : err.message})
        }
    },
    async delete(req,res){
        try{
            const {user} = req
            await userServices.delete({user})
            res.status(200).json({ok : true , message : 'User was deleted'})
        }catch(err){
            res.status(err.code).json({ok : false , message : err.message})
        }
    }

}
module.exports = usersController