const {Router} = require('express')
const router = Router()
const usersController = require('../controllers/users.controller')

// /users
router.post('/sign_up', usersController.signUp)
router.post('/sign_in', usersController.signIn)
router.post('/refresh_tokens', usersController.refreshTokens)
router.post('/logout',usersController.logOut)
router.post('/delete',usersController.delete)

module.exports = router