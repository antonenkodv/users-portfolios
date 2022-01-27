const { Router } = require('express')
const router = Router()
const portfolioController = require('../controllers/portfolio.controller')
const isOwner = require('../middlewares/isOwner.middleware')

// /portfolio
router.post('/create',portfolioController.create )
router.get('/get_user_portfolio', portfolioController.getUserPortfolio)
router.post('/delete', isOwner ,portfolioController.deletePortfolio)

module.exports = router