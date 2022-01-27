const imagesService = require('../services/images.services')
const {validateParams, errorHandler} = require("../validation");

const imagesController = {
    async saveImage(req, res) {
        try {
            const {body : {description , portfolio_id}, file, user} = req

            if (!validateParams([description],"string") || !validateParams([portfolio_id],"uuid")){
                errorHandler('Invalid input parameters',500)
            }

            const response = await imagesService.saveImage({
                description: description,
                portfolio_id: portfolio_id,
                filename: file.filename,
                owner_id: user.id
            })
            res.status(200).json({ok: true, filepath: `http://localhost:5000/images/${response.filename}`})
        } catch (err) {
            res.status(err.code).json({ok: false, message: err.message})
        }
    },
    async addComment(req, res) {
        try {
            const {comment, image_id} = req.body

            if (!validateParams([comment],"string") || !validateParams([image_id],"uuid")){
                errorHandler('Invalid input parameters',500)
            }

            await imagesService.addComment({comment, image_id})
            res.status(200).json({ok: true, message: "Comment added"})
        } catch (err) {
            res.status(err.code).json({ok: false, message: err.message})
        }
    },
    async deleteImage(req, res) {
        try {
            const {filename} = req.body //validate in middleware isOwner

            await imagesService.deleteImage({filename})
            res.status(500).json({ok: true, message : 'Successfully deleted'})
        } catch (err) {
            res.status(err.code).json({ok: false, message: err.message})
        }
    },
    async getAllImages(req, res) {
        try {
            const response =await imagesService.getAllImages()
            res.status(200).json({ok: true, response})
        } catch (err) {
            res.status(err.code).json({ok: false, message: err.message})
        }
    }
}
module.exports = imagesController