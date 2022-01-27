const jwt = require('jsonwebtoken')
const {models: {User}} = require('../db/init_db')
const helpers = require('../helpers')
const listEndpoints = require('express-list-endpoints')

module.exports = async (req, res, next) => {
    const needAccess = helpers.checkLimitedAccessUrl(req.originalUrl)
    if (needAccess) {
        const token = req.headers['x-token']
        if (token) {
            try {
                const {userInfo: { email }} = jwt.decode(token)
                const user = await User.findOne({where: {email}, raw: true})
                user ? req.user = user : (res.status(500).send('No such user'))
            } catch (err) {
                return res.status(500).send('Wrong authorization')
            }
        } else if (!token) {
            return res.status(401).send('Missing access token');
        }
    } else {
        const correctUrl = listEndpoints(req.app).some(item => item.path === req.originalUrl)
        !correctUrl && (res.status(404).json({ok : false , message : 'Not Found'}))
    }
    next()
}
