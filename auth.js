const jwt = require('jsonwebtoken')
const {models: {User}} = require('./db/init_db')
const bcrypt = require('bcrypt')
const {errorHandler} = require("./validation");
require('dotenv').config()

const SECRET1 = process.env.SECRET_1
const SECRET2 = process.env.SECRET_2

const Auth = {
    createTokens({email, password, id}, refreshTokenSecret) {
        const newToken = jwt.sign(
            {userInfo: {email, password, id}},
            SECRET1,
            {expiresIn: '1h'}
        )

        const refreshToken = jwt.sign(
            {userInfo: {email, password, id}},
            refreshTokenSecret,
            {expiresIn: '7d'}
        )
        return [newToken, refreshToken]
    },
    refreshTokens({refreshToken}) {
        try {
            const {userInfo} = jwt.decode(refreshToken);
            const secret = userInfo.password + SECRET2
            const verify = jwt.verify(refreshToken, secret)
            if (verify) {
                const [newToken, newRefreshToken] = this.createTokens(userInfo, secret);
                return {
                    token: newToken,
                    refreshToken: newRefreshToken,
                }
            }
        } catch (err) {
          errorHandler('Something went wrong',500)
        }
    },
    async tryLogin({email, password}) {
        try{
            const user = await User.findOne({where: {email}, raw: true});

            if (!user) {
                errorHandler('Wrong email',403)
            }

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                errorHandler('Wrong password',403)
            }

            const refreshTokenSecret = user.password + SECRET2;
            const [token, refreshToken] = this.createTokens(user, refreshTokenSecret);

            await User.update({status: 'ONLINE'}, {where: {email}, raw: true});

            return {
                ok: true,
                token,
                refreshToken,
            }
        }catch(err){
            errorHandler('Something went wrong',500)
        }
    },
}

module.exports = Auth