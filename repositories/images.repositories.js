const fs = require('fs')
const path = require('path')
const {models: {Image, Portfolio}, sequelize} = require('../db/init_db')
const uuid = require('uuid4')
const {errorHandler} = require("../validation");

const imagesRepositories = {
    saveImages({description, filename, owner_id, portfolio_id}) {
        const newImage = {id : uuid(), description, filename, owner_id, portfolio_id}
        return Image.create(newImage).catch(()=>errorHandler('Somethins went wrong',500))
    },
    addComment({comment, image_id}) {
        return Image.update(
            {'comments': sequelize.fn('array_append', sequelize.col('comments'), comment)},
            {'where': {'id': image_id}}
        ).catch(()=>errorHandler('Something went wrong',500))
    },
    getAllImages() {
        return Image.findAndCountAll({
            include: {
                model: Portfolio,
                attributes: ['name'],
                required : false
            },
            attributes: ['comments', 'filename', 'description'],
            order: [['createdAt', 'DESC']],
            raw: true
        }).catch(()=>errorHandler('Something went wrong',500))
    },
    deleteImage({filename}) {
        const filePath = path.join(__dirname, '../', `./public/images/${filename}`)

        return fs.unlink(filePath, (err) => {
            if (err) errorHandler('Something went wrong',500)
            return Image.destroy({
                where: {filename}
            }).catch(()=> errorHandler('Something went wrong',500))
        })
    }
}

module.exports = imagesRepositories