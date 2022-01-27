const helpers = require('../helpers')
const { Router } = require('express')
const router = Router()
const imagesController = require('../controllers/images.controller')
const isOwner = require('../middlewares/isOwner.middleware')
// /images
router.post('/upload', helpers.multerHelper(), imagesController.saveImage )
router.post('/add_comment', imagesController.addComment)
router.post('/delete_image',isOwner , imagesController.deleteImage)
router.get('/get_all_images' , imagesController.getAllImages)

module.exports = router