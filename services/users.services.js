const usersRepositories = require('../repositories/users.repositories')

const usersService = {
    signUp({name,password , email}) {
        return usersRepositories.signUp({name,password, email })
    },
    signIn({email , password }){
        return usersRepositories.signIn({password , email})
    },
    refreshTokens({refreshToken}){
        return usersRepositories.refreshToken({refreshToken})
    },
    logOut({id , email}){
        return usersRepositories.logOut({id , email})
    },
    delete({user}){
        return usersRepositories.delete({user})
    }
}

module.exports = usersService