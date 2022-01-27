const imagesRepositories = require('../repositories/images.repositories')

const imagesServices = {
    saveImage(body) {
        return imagesRepositories.saveImages(body)
    },
    addComment({comment , image_id}){
        return imagesRepositories.addComment({comment , image_id})
    },
    getAllImages(){
    return imagesRepositories.getAllImages()
    },
    deleteImage({filename}){
        return imagesRepositories.deleteImage({filename} )
    }
}


module.exports = imagesServices